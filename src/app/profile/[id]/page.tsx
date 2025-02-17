
export default function ProfilePage({params}: any) {

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1>Profile Page</h1>
        <hr />
        <p>Profile Page {params.id}</p>
        </div>
    );
    }