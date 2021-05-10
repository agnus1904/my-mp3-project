import React from 'react';

interface NotFoundProps{
}

const defaultProps : NotFoundProps = {
}

const NotFound:React.FC<NotFoundProps> =(props) :React.ReactElement => {

    // const {} = props;

    return (
        <div>
            This is NotFound Page
        </div>
    );
};

NotFound.defaultProps = defaultProps;

export default NotFound;