'use client';

type Props = {
  error: Error;
}

const Error = ({error}: Props) => {
    // console.log(error.message);
    return (
        <p>Error.{error.message}</p>
    );
};

export default Error;