import jest from 'jest';
import firebase from 'firebase';

jest.mock('./firebase', () => {
    const set = jest.fn();
    
    return {
        database: jest.fn(() => ({
            ref: jest.fn(() => ({
                push: jest.fn(() => ({
                set,
                })),
            })),
        })),
    };
});