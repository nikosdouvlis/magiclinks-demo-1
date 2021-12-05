import { NextPage } from 'next';
import { isMagicLinkError, MagicLinkErrorCode, useClerk } from '@clerk/nextjs';
import React from 'react';

const Verify: NextPage = () => {
  const { handleMagicLinkVerification } = useClerk();
  const [status, setStatus] = React.useState('pending');

  React.useEffect(() => {
    async function verify() {
      try {
        // The user will be redirected to this page upon clicking the magic link
        // If the link is clicked from the same device that initiated the magic link flow,
        // handleMagicLinkVerification will immediately navigate to redirectUrlComplete
        // and the user will be signed in
        await handleMagicLinkVerification({
          redirectUrlComplete: 'http://localhost:3000/?success=true',
        });

        // If the link is clicked from a different device
        // (eg: A user attempts to sign in from their desktop, but clicks the link on their mobile phone)
        // the flow will continue from the original device and this page can be used to render
        // a friendly message:
        setStatus('Verified, please continue on other device');
      } catch (err) {
        if (isMagicLinkError(err) && err.code === MagicLinkErrorCode.Expired) {
          setStatus('expired');
        }
      }
    }

    verify();
  }, []);

  return (
    <div>
      <h2>Verification result: {status}</h2>
    </div>
  );
};

export default Verify;
