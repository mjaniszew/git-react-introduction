/** @jsx React.DOM */

var MainContainer = React.createClass({

    getDefaultProps: function () {
        return {
            superheroes: [
                {name: "Hulk", quote: "Hulk smash!"},
                {name: "Bananaman", quote: "Eeeek!"},
                {name: "Supeman", quote: "Superman don't need no seat belt."},
                {name: "Batman", quote: "Nananana!"}
            ]
        };
    },

    render: function() {
        return (
            <div className="mainContainer">
                Your first component
            </div>
        );
    }
});

React.renderComponent(
    <MainContainer />,
    document.getElementById('viewport')
);