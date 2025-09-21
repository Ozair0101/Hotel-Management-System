const ErrorCart = (props) => {
    return (
        <div className="bg-red-400 absolute bottom-8 right-0 text-white text-center flex justify-center items-center w-80 h-24">
            <h1>{props.message}</h1>
        </div>
    );
};
export default ErrorCart;
