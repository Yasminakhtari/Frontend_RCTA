import { Menu, Button, Text, rem, Avatar, Switch, useMantineTheme } from '@mantine/core';
import {

  IconSearch,
  IconMessageCircle,
  IconTrash,
  IconArrowsLeftRight,
  IconUserCircle,
  IconFileText,
  IconMoon,
  IconSun,
  IconMoonStars,
  IconLogout2,
  IconTournament,
} from '@tabler/icons-react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { removeUser } from '../../Slices/UserSlice';

const ProfileMenu = () => {      

    const dispatch = useDispatch();
    const user = useSelector((state:any)=>state.user);//
    const[checked,setChecked] = useState(false);
    const[opened,setOpened] = useState(false);


    console.log(user.data.userDetails.firstName)
    ////
    const handleLogout= () => {
      dispatch(removeUser());
      
      localStorage.removeItem("token")
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
    <Menu shadow="md" width={200} opened={opened} onChange={setOpened }>
      <Menu.Target>
        <Button className='!text-gray-200 !bg-gray-900'>
            <div className='flex gap-2  cursor-pointer items-center'>
            {/* <div className='hidden lg:flex gap-2 items-center'> */}
              
              <div>{user.data.userDetails.firstName}</div>
              <Avatar src="avatar.png" alt="it's me" />
             </div>
        </Button>
      </Menu.Target>

      <Menu.Dropdown onChange={()=>setOpened(true)}>
        
          <Link to="/profile" >
            <Menu.Item leftSection={<IconUserCircle style={{ width: rem(14), height: rem(14) }} />}>
               Profile
            </Menu.Item>
          </Link>
        <Menu.Item leftSection={<IconMessageCircle style={{ width: rem(14), height: rem(14) }} />}>
          Messages
        </Menu.Item>
      
        <Menu.Item leftSection={<IconTournament style={{ width: rem(14), height: rem(14) }} />}>
          Tournaments
        </Menu.Item>

        <Menu.Item
          leftSection={<IconMoon style={{ width: rem(14), height: rem(14) }} />}
          rightSection={
             <Switch checked={checked} onChange={(event) => setChecked(event.currentTarget.checked)}  size="md" color="dark.4" onLabel={sunIcon} offLabel={moonIcon}/>
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