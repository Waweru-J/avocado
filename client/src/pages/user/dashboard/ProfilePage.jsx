import { useContext } from "react";
import { AuthContext } from "../../../store/AuthProvider";
import profile from "../../../assets/images/profilepic.svg";

const ProfilePage = () => {
  const { authUser } = useContext(AuthContext);

  return (
    <div>
      <div className=" flex bg-white w-1/2 py-10 px-10">
        <div className="flex-shrink-0 mr-10">
          <h2 className="mb-6 text-4xl font-bold">Profile Page</h2>
          {/* Placeholder for user avatar */}
          <img
            className="w-30 h-40 rounded-full"
            src={profile}
            alt="User Avatar"
          />
        </div>
        <div>
          <h2 className="mb-6 text-4xl font-bold">Personal Information</h2>
          <div className="">
            <h3 className="text-3xl  mb-6">Username</h3>
            <h2 className="text-1xl my-2 bg-green-100 p-2 font-bold">
              {authUser.username}
            </h2>
            <p className="mb-2"></p>
          </div>
          <div className="">
            <h3 className="text-3xl  mb-6">Email Address</h3>
            <h2 className="text-1xl my-2 bg-green-100 p-2 font-bold">
              {authUser.email}
            </h2>
            <p className="mb-2"></p>
          </div>
          <div className="">
            <h3 className="text-3xl  mb-6">Phone Number</h3>
            <h2 className="text-1xl my-2 bg-green-100 p-2 font-bold">
              {authUser.phone}
            </h2>
            <p className="mb-2"></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
