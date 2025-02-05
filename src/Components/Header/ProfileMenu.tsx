import { Menu, Button, Text, rem, Avatar, Switch, useMantineTheme, Divider } from '@mantine/core';
import {


  IconMessageCircle,
  IconTrash,
  IconArrowsLeftRight,
  IconUserCircle,
  IconMoon,
  IconSun,
  IconMoonStars,
  IconLogout2,
  IconTournament,
  IconMan,
} from '@tabler/icons-react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { removeUser } from '../../Slices/UserSlice';

// Added onClose prop to handle sidebar close
interface ProfileMenuProps {
  onClose?: () => void;
}

const ProfileMenu: React.FC<ProfileMenuProps> = ({ onClose }) => {
  
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);
  // const profile = useSelector((state: any) => state.profile || { picture: null });

console.log("User State:", user);
// console.log("First Name:", user?.userDetails?.firstName);
// console.log("First Name:", user?.firstName);


  const [checked, setChecked] = useState(false);
  const [opened, setOpened] = useState(false);
  const navigate = useNavigate();


//   console.log(user.data.userDetails.firstName);
//   console.log("User Data:", user?.data);
// console.log("User Details:", user?.data?.userDetails);
// console.log("profile:", user?.data?.userDetails?.profile);
// console.log("prorrr",user?.profile);


  ////
  const handleLogout = () => {
    dispatch(removeUser());
    localStorage.removeItem("token")
    if (onClose) onClose(); // Close the sidebar when logging out
    navigate("/")
  }
  ////



  const sunIcon = (
    <IconSun
      style={{ width: rem(16), height: rem(16) }}
      stroke={2.5}
      color={"yellow"}
    />
  );

  const moonIcon = (
    <IconMoonStars
      style={{ width: rem(16), height: rem(16) }}
      stroke={2.5}
      color={"cyan"}
    />
  );


  return (
    <Menu shadow="md" width={200} opened={opened} onChange={setOpened}>
      <Menu.Target>
        <button className='!text-gray-200 !bg-gray-900 w-min p-1 rounded-md shadow-md'onClick={onClose} >
          
          <div className='flex gap-1  cursor-pointer items-center'>
            {/* <div className='hidden lg:flex gap-2 items-center'> */}

            {/* <div className='text-xs' >{user.data.userDetails.firstName}</div> */}
            {/* <Avatar src={user.data.userDetails.profile?`data:image/jpeg;base64,${user.data.userDetails.profile}`:"iranian-8594205_1280.jpg"} alt="it's me" /> */}
           
            <Avatar 
            src={user?.data?.userDetails?.profile || "iranian-8594205_1280.jpg"}
            alt={`${user?.data?.userDetails?.firstName}'s profile`}
        />
          </div>
          
        </button>
      </Menu.Target>

      <Menu.Dropdown onChange={() => setOpened(true)}>

        <Link to="/profile"  onClick={onClose} >
          <Menu.Item leftSection={<IconUserCircle style={{ width: rem(14), height: rem(14) }} />}>
            {user.data.userDetails.firstName}
          </Menu.Item>
        </Link>

        <Divider />
        <Link to="/admin"  onClick={onClose}>
          <Menu.Item leftSection={<IconMan style={{ width: rem(14), height: rem(14) }} />}>
            ADMIN
          </Menu.Item>
        </Link>
        <Divider  />

        <Menu.Item leftSection={<IconMessageCircle style={{ width: rem(14), height: rem(14) }} />}>
          Messages
        </Menu.Item>

        <Menu.Item leftSection={<IconTournament style={{ width: rem(14), height: rem(14) }} />}>
          Tournaments
        </Menu.Item>

        <Menu.Item
          leftSection={<IconMoon style={{ width: rem(14), height: rem(14) }} />}
          rightSection={
            <Switch checked={checked} onChange={(event) => setChecked(event.currentTarget.checked)} size="md" color="dark.4" onLabel={sunIcon} offLabel={moonIcon} />
          }
        >
          Dark Mode
        </Menu.Item>

        <Menu.Divider />


        <Menu.Item onClick={handleLogout}
          color="red"
          leftSection={<IconLogout2 style={{ width: rem(14), height: rem(14) }} />}
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
export default ProfileMenu;