'use client';

type Props = {
  error: Error;
}

const Error = ({error}: Props) => {
    console.log(error.message);
    return (
        <p>Could not fetch note details. {error.message}</p>
    );
};

export default Error;