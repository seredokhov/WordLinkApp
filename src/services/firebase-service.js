import firestore from '@react-native-firebase/firestore';

class FirebaseService {
    async getDictionary() {
        try {
            const querySnapshot = await firestore().collection('dictionary').get();
            let dictionary = {};

            querySnapshot.forEach(wordSnapshot => {
                const data = wordSnapshot.data();
                dictionary[data.word] = data;
            });

            return dictionary;
        } catch (error) {
            alert(error);
        }
    }

    async uploadData(data) {
        try {
            const collectionSnapshot = await firestore().collection('dictionary');
            const querySnapshot = await collectionSnapshot.get();

            querySnapshot.docs.map(async item => {
                await item.ref.delete();
            });

            const values = Object.values(data);

            values.map(async value => {
                await collectionSnapshot.add(value);
            });
        } catch (error) {
            alert(error);
        }
    }

    async removeData() {
        try {
            const querySnapshot = await firestore().collection('dictionary').get();

            querySnapshot.docs.map(async word => {
                await word.ref.delete();
            });
        } catch (error) {
            alert(error);
        }
    }
}

export default new FirebaseService();
