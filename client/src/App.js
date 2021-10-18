import React, { useEffect, useState } from "react";
import { useSubscription, useMutation, useQuery } from "@apollo/client";
import { GET_ALL_USERS, CREATE_USER, CREATE_USER_SUBSCRIPTION } from "./query";
import Posts from "./Posts";
import './App.css';

function App() {
    const { subscribeToMore, loading, error, data, refetch } = useQuery(GET_ALL_USERS);
    const [newUser] = useMutation(CREATE_USER, {
        // refetchQueries: [GET_ALL_USERS],
        // onQueryUpdated: (oq, d, ld) => console.log('UPDATED', oq, d, ld)
    });
    const { data: subData, loading: subloading } = useSubscription(CREATE_USER_SUBSCRIPTION, {
        variables: { postId: 1 },
    });

    const [users, setUsers]  = useState([]);
    const [username, setUsername]  = useState('');
    const [age, setAge] = useState(0);
    // console.log('GET_ALL_USERS', loading, error, data, refetch);

    const addUser = (e) => {
        e.preventDefault();
        newUser({
            variables: {
                input: { username, age: Number(age) }
            }
        }).then(res => {
            // console.log('res', res);
            setUsername('');
            setAge(0);
        });
    }

    const getAllUsers = (e) => {
        e.preventDefault();
        refetch();
    }

    const addPost = (e) => {
        e.preventDefault();
    }

    useEffect(() => {
        if (!loading) {
            // console.log('data.getAllUsers', data)
            setUsers(data.getAllUsers);
        }
        // console.log('data.getAllUsers', data)
    }, [data]);

  return (
    <div className="App">
        <form>
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
            <input type="text" value={age} onChange={e => setAge(e.target.value)} />
            <div className="btns">
                <button onClick={(e) => addUser(e)}>Create</button>
                <button onClick={e => getAllUsers(e)}>Refresh</button>
                <button onClick={e => addPost(e)}>Add Post</button>
            </div>
        </form>
        <AllUsers loading={loading} error={error} data={users} />
        {!subloading ? subData : 'subData is load'}
        {/*<Posts*/}
        {/*    subscribeToPosts={*/}
        {/*        () => {*/}
        {/*            subscribeToMore({*/}
        {/*                document: POST_SUBSCRIPTION,*/}
        {/*                updateQuery: (prev, { subscriptionData}) => {*/}
        {/*                    if (!subscriptionData.data) {*/}
        {/*                        return prev;*/}
        {/*                    }*/}
        {/*                    const newPost = subscriptionData.data.postAdded;*/}
        {/*                    return { ...prev, newPost }*/}
        {/*                }*/}
        {/*            });*/}
        {/*        }*/}
        {/*    }*/}
        {/*/>*/}
    </div>
  );
}

export default App;

function AllUsers({ loading, error, data }) {
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    // console.log('data', data)

    return data ? data.map(({ id, username, age }) => (
        <div key={id}>
            <p>
                {username} {age}
            </p>
        </div>
    )) : null
}
