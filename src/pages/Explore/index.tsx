import React from 'react';

interface ExploreProps{
}

const defaultProps : ExploreProps = {
}

const Explore:React.FC<ExploreProps> =(props) :React.ReactElement => {

    // const {} = props;

    return (
        <div>
            This is Explore Page
        </div>
    );
};

Explore.defaultProps = defaultProps;

export default Explore;