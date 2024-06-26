import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  User,
  Modal, ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button
} from "@nextui-org/react";
import { Home } from "../../icons/Navbar/Home";
import { Message } from "../../icons/Navbar/Message";
import { CreatPost } from "../../icons/Navbar/creatPost";
import { Explore } from "../../icons/Navbar/Explore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import Bookmark from "../../icons/Navbar/Bookmark";
import { Link } from "react-router-dom";
import { logout } from "../../redux/reducers/LogoutReducer";
import { me } from "../../redux/reducers/MeReducer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
const SideNav_expanded = () => {

  const data = useSelector((state) => state.me.data);

  const getProfile = () => {
    if (data.profileImage == "") {
      return "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Image.png";
    } else {
      return data.profileImage;
    }
  };
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const handleLogout = async () => {
      await dispatch(logout())

      // Redirect or perform any other action after successful logout
      await dispatch(me());
      navigateTo("/Signup")
      console.log("User logged out successfully!");
     // Close the modal
      setShowLogoutModal(false);
    };


  return (
    <div style={{ width: "250px", top: "0", height: "fit-content" }}>
      <Card
        style={{ height: "100vh", position: "fixed" }}
        className=" py-4 flex-col justify-between items-center w-auto  "
      >
        <CardHeader className="flex-col justify-center items-center w-auto">
          <div className="flex items-center gap-4">
            <Dropdown placement="bottom-start">
              <DropdownTrigger>
                <User
                  as="button"
                  avatarProps={{
                    isBordered: true,
                    src: getProfile(),
                  }}
                  className="transition-transform"
                  // description="@tonyreichert"
                  name={data.username}
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="profile">
                  <Link to="/UserProfile">

                    <p className="font-semibold">Signed in as {data.username}</p>
                    {/* <p className="font-semibold"></p> */}
                  </Link>
                </DropdownItem>
                <DropdownItem key="settings">
                  <Link to="/Setting">

                    My Settings
                  </Link>
                </DropdownItem>
                <DropdownItem
                  key="logout"
                  color="danger"
                  onClick={() => setShowLogoutModal(true)}
                >
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
      <Modal
        className="absolute top-1/2"
        isOpen={showLogoutModal}
        onOpenChange={setShowLogoutModal}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Oh no! You are leaving........Are you sure?
              </ModalHeader>
              <ModalFooter>
                <Button color="danger" variant="light" onClick={() => setShowLogoutModal(false)}>
                  No, Just Kidding!
                </Button>
                <Button color="primary" onClick={handleLogout}>
                  Yes, Log me out!
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
          </div>
        </CardHeader>
        <CardBody className="flex-col justify-center items-start w-auto gap-4">
          <Link to="/Home">
            <button className="flex flex-row  gap-4 ">
              <Home />
              <span className="text-xl">Home</span>
            </button>{" "}
          </Link>
          <button className="flex flex-row  gap-4 ">
            <Message /> <span className="text-xl">Coming Soon..</span>
          </button>{" "}
          <Link to="/CreatePost">
            <button className="flex flex-row  gap-4 ">
              <CreatPost /> <span className="text-xl">Create Post</span>
            </button>{" "}
          </Link>
          <Link to="/Explore">
            <button className="flex flex-row  gap-4 ">
              <Explore /> <span className="text-xl">Explore</span>
            </button>
          </Link>
          <Link to="/UserProfile">
            <button className="flex flex-row  gap-4 ">
              <Bookmark /> <span className="text-xl">Bookmark</span>
            </button>
          </Link>
        </CardBody>
        <CardFooter className="flex-col justify-center items-center w-auto">
          <Link to="/Setting">
            <button className="flex flex-row  gap-4 ">
              <FontAwesomeIcon icon={faGear} size="xl" />
              <span className="text-xl">Setting</span>
            </button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SideNav_expanded;
