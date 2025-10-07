import React from 'react';
import MainPreview from '../MainPreview/MainPreview';
import MainTopList from '../MainTopList/MainTopList';
import type { User } from '../../api/api';

interface MainProps {
  user: User | null;
  setUser: (user: User | null) => void;
}

export default function Main({ user, setUser }: MainProps) {
  return (
    <main>
      <MainPreview user={user} setUser={setUser} />
      <MainTopList />
    </main>
  );
}
