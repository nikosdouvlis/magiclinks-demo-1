import { NextPage } from 'next';
import React, { useEffect } from 'react';
import { useClerk, useSignIn } from '@clerk/nextjs';
import { EmailLinkFactor } from '@clerk/types';

const SignInPage: NextPage = () => {
  const signIn = useSignIn();
  const [email, setEmail] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [status, setStatus] = React.useState('');
  const { setSession, navigate } = useClerk();

  const { startMagicLinkFlow, cancelMagicLinkFlow } = React.useMemo(
    () => signIn.createMagicLinkFlow(),
    [signIn],
  );

  useEffect(() => {
    return cancelMagicLinkFlow;
  }, []);

  const start = async () => {
    setLoading(true);
    let si = await signIn.create({ identifier: email });

    const factor = si.supportedFirstFactors.find(
      ff => ff.strategy === 'email_link' && ff.safe_identifier === email,
    ) as EmailLinkFactor;

    si = await startMagicLinkFlow({
      emailAddressId: factor.email_address_id,
      redirectUrl: 'http://localhost:3000/verify',
    });

    const verification = si.firstFactorVerification;
    if (verification.verifiedFromTheSameClient()) {
      // If the link is clicked from the same device, the flow will continue
      // in the tab opened by the magic link
      setStatus(
        'You are signed in! Switch to the tab opened by the magic link to continue.',
      );
      return;
    }

    if (si.status === 'complete') {
      return setSession(si.createdSessionId, () =>
        navigate('http://localhost:3000/'),
      );
    } else if (si.status === 'needs_second_factor') {
      // If 2FA is enabled, you can navigate to the 2FA page here
      // otherwise, this branch can be safely ignored
    }
  };

  return (
    <div>
      <h2>See the source code of `/pages/sign-in.tsx` for more details</h2>
      <h3>
        Go to sign up, create a new user, sign out and try to sign in using the
        magic link flow
      </h3>
      <input
        type='text'
        placeholder='Email address'
        value={email}
        onChange={e => {
          setEmail(e.target.value);
        }}
      />
      <button onClick={start}>Sign in using magic links</button>
      {loading && (
        <p style={{ color: 'green' }}>waiting for magic link result...</p>
      )}
      Verification status: {status}
    </div>
  );
};

export default SignInPage;
