import { useEffect } from 'react';

function Posts({ subscribeToPosts, data = [] }) {
    useEffect(() => {
        subscribeToPosts();
    }, []);

    console.log('|| posts ||');

    return data.length > 0 ? data.map(({ id, content }) => (
        <div key={id}>
            <p>{content}</p>
        </div>
    )) : null;
}

export default Posts;
