import React, { useState } from 'react';
import { dbService } from 'fbase';
import { addDoc, collection } from '@firebase/firestore';

const Home = () => {
    const [nweet, setNweet] = useState('');

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
        </div>
    );
};

export default Home;
