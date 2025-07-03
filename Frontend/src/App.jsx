import React, { useEffect } from 'react'
import Nav from './components/Nav'
import MainRoute from './routes/MainRoute'
import { useDispatch, useSelector } from 'react-redux';
import { asynccurrentuser } from './store/actions/userActions';

const App = () => {
  const user = useSelector((state) => state.user.user); // .user.user
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) dispatch(asynccurrentuser());
  }, [user, dispatch]);

  return (
    <div>
      <Nav />
      <MainRoute />
    </div>
  )
}

export default App