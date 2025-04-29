function Profile({ user }) {
    return (
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Profile</h2>
        <div className="bg-white p-6 rounded shadow-md">
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>User ID:</strong> {user.uid}</p>
        </div>
      </div>
    )
  }
  
  export default Profile