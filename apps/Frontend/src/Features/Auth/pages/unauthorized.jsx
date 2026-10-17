import { Link } from "react-router";

const Unauthorized = () => {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4">
            <h1 className="text-4xl font-bold">403</h1>

            <p>You don't have permission to access this page.</p>

            <Link
                to="/login"
                className="rounded-lg bg-red-500 px-5 py-2 text-white"
            >
                Back to Login
            </Link>
        </div>
    );
};

export default Unauthorized;