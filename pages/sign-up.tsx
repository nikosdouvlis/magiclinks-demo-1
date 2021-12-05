import { NextPage } from 'next';
import { SignUp } from '@clerk/nextjs';
import React from 'react';

const SignUpPage: NextPage = () => {
  return (
    <div>
      <h2>Use the prebuilt SignUp component below to create a new test user</h2>
      <SignUp />
    </div>
  );
};

export default SignUpPage;
