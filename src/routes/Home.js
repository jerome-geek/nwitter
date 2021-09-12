import React, { useEffect, useState } from 'react';
import { dbService } from 'fbase';
import { addDoc, collection, getDocs, orderBy } from '@firebase/firestore';

const Home = () => {
    const [nweet, setNweet] = useState('');
    const [nweets, setNweets] = useState([]);
    const getNweets = async () => {
        const dbNweets = await getDocs(collection(dbService, 'nweets'));
        dbNweets.forEach((document) => {
            const nweetObject = {
                ...document.data(),
                id: document.id,
            };

            setNweets((prev) => [nweetObject, ...prev]);
        });
    };

    useEffect(() => {
        getNweets();
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            const docRef = await addDoc(collection(dbService, 'nweets'), {
                nweet,
                createdAt: Date.now(),
            });
            console.log('Document written with ID: ', docRef.id);
        } catch (error) {
            console.error('Error adding document: ', error);
        }

        setNweet('');
    };
    const onChange = (e) => {
        const {
            target: { value },
        } = e;
        setNweet(value);
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input
                    type='text'
                    value={nweet}
                    onChange={onChange}
                    placeholder="What's on your mind?"
                    maxLength={120}
                />
                <input type='submit' value='Nweet' />
            </form>
            <div>
                {nweets.map((nweet) => (
                    <div key={nweet.id}>
                        <h4>{nweet.nweet}</h4>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
