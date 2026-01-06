import React, { useState, useEffect, useContext, Fragment } from 'react';
import { View, StyleSheet } from 'react-native';
import { ContextApp } from '../../store/context';
import { Init, MergeWords, SetError } from '../../store/actions';
import AsyncStorageService from '../../services/async-storage-service';
import WordService, { wordMapper } from "../../services/word-service";
import CloudButton from './cloud-button';
import Loader from '../loader';
import { errorHandler, prepareWordsToSynchronize } from '../../utils';

const CloudButtons = () => {
    const { store: { user, dictionary, isOnline }, dispatch } = useContext(ContextApp);
    const [wordsToSynchronize, setWordsToSynchronize] = useState({});
    const [isReady, setReady] = useState(false);

    const {
        toDownload,
        toCreate,
        toUpdate
    } = wordsToSynchronize;

    const isUploadButtonDisabled = !toCreate && !toUpdate;
    const isDownloadButtonDisabled = !toDownload;

    const fetchData = () => {
        setReady(false);
        WordService.getDictionary(user.token)
            .then(response => {
                const localEntities = Object.values(dictionary);
                const remoteEntities = Object.values(response.data);
                const combinedWords = prepareWordsToSynchronize(localEntities, remoteEntities);

                setWordsToSynchronize(combinedWords);
            })
            .catch(err => dispatch(SetError(errorHandler(err))))
            .finally(() => setReady(true));
    };

    useEffect(() => {
        fetchData();
    }, [dictionary]);

    const downloadData = () => {
        if (Object.keys(toDownload).length === 0) {
            return;
        }

        const updatedDictionary = {
            ...dictionary,
            ...toDownload
        };

        AsyncStorageService.setDictionary(updatedDictionary)
            .then(() => dispatch(Init(updatedDictionary)))
            .catch(err => dispatch(SetError(errorHandler(err))));
    };

    const uploadData = () => {
        if (!isOnline || !user.isDataSynchronized || !user.token) {
            return;
        }

        const body = {
            wordsToCreate: Object.values(toCreate || {}).map(wordMapper),
            wordsToUpdate: Object.values(toUpdate || {}).map(wordMapper)
        };

        WordService.mergeWords(body, user.token)
            .then(mergedWordsData => {
                AsyncStorageService.mergeWordsData(mergedWordsData)
                    .then(() => dispatch(MergeWords(mergedWordsData)));
            })
            .catch(err => dispatch(SetError(errorHandler(err))));
    };

    return (
        <View style={styles.wrap}>
            {
                !isReady ? (
                    <Loader iconSize={50} />
                ) : (
                    <Fragment>
                        <CloudButton
                            disabled={isDownloadButtonDisabled}
                            iconName={toDownload ? 'cloud-download-outline' : 'cloud-done'}
                            text={toDownload ? 'Download' : 'Downloaded'}
                            onPress={downloadData}
                        />
                        <CloudButton
                            disabled={isUploadButtonDisabled}
                            iconName={toCreate || toUpdate ? 'cloud-upload-outline' : 'cloud-done'}
                            text={toCreate || toUpdate ? 'Upload' : 'Uploaded'}
                            onPress={uploadData}
                        />
                    </Fragment>
                )
            }
        </View>
    );
};

const styles = StyleSheet.create({
    wrap: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 100
    }
});

export default CloudButtons;
