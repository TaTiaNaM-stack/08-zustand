'use client';

type Props = {
  error: Error;
}

const Error = ({error}: Props) => {
    // console.log(error.message);
    return (
        <p>Could not fetch the list of notes.{error.message}</p>
    );
};

export default Error;