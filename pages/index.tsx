import type { NextPage } from 'next';
import styles from '../styles/Home.module.css';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import React from 'react';
import Link from 'next/link';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <SignedIn>
        You are signed in: <UserButton afterSignOutAll='/' />
        <br />
        Use the UserButton above to sign out, then try signing in using
        magiclinks
      </SignedIn>
      <SignedOut>
        <Link href={'/sign-up'}>Go to Sign Up</Link> /{' '}
        <Link href={'/sign-in'}>Go to Sign In</Link>
      </SignedOut>
    </div>
  );
};

export default Home;
