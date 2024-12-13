import { useQuery } from 'react-query';
import { getUserData } from '../auth/auth';
//import { getAllConfirmedAppointments, getAllPendingAppointments, getNurses, getConfirmedAppointmentsByNurse, getPendingAppointmentsByNurse, getNurseLocationMap } from '@/api/nurse-dashboard.service'; // Replace with your actual service imports
// import { getAllLocations } from '@/api/location.service';
//import { getAllIvblu } from '@/api/ivblu.api';

//import { getAllOrders, getAllOrderByClient } from '@/api/order.api';
//import { getAllAppointmentsByClient } from '@/api/appointment.service';
//import { fetchAllPages } from '@/api/pages.api';

const fetchUserData = async () => {
  const user = getUserData(); // Fetch user role from auth.js or API
  const userId = user ? user.id : null;

  // Fetch must-fetch data for all users (including non-logged-in)
  const mustFetchData = {
    // allLocations: await getAllLocations(),
    // allServices: await getAllIvblu(),
  };

  let roleSpecificData = {};

  // Check if the user is logged in and has a role
  // if (user) {
  //   switch (user.role) {
  //     case 'ADMIN':
  //       roleSpecificData = {
  //         // confirmedData: await getAllConfirmedAppointments(),
  //         // pendingData: await getAllPendingAppointments(),
  //         // allNurses: await getNurses(),
  //         // allNurseLocationMap: await getNurseLocationMap(),
  //         // allOrders: await getAllOrders(),
  //         // allPages: await fetchAllPages(),
  //       };
  //       break;
  //     case 'NURSE':
  //       roleSpecificData = {
  //         confirmedData: await getConfirmedAppointmentsByNurse(userId),
  //         pendingData: await getPendingAppointmentsByNurse(userId),
  //       };
  //       break;
  //     case 'USER':
  //       roleSpecificData = {
  //         appointments: await getAllAppointmentsByClient(user.id),
  //         // orders: await getAllOrderByClient(user.id),
  //       };
  //     default:
  //   }
  // }

  // Merge must-fetch data with role-specific data
  const fetchedData = { ...mustFetchData, ...roleSpecificData };

  // Cache the fresh data in local storage
  localStorage.setItem("userData", JSON.stringify(fetchedData));

  return fetchedData;
};

// Use the React Query hook
export const useUserData = () => {
  const { data, refetch, isLoading, error } = useQuery('userData', fetchUserData, {
    staleTime: 60000, // Data stays fresh for 1 minute
    refetchInterval: 60000, // Refetch every 1 minute
    refetchOnWindowFocus: false,
    onSuccess: (data:any) => {
      localStorage.setItem("userData", JSON.stringify(data));
    },
    initialData: () => {
      const cachedData = localStorage.getItem("userData");
      return cachedData ? JSON.parse(cachedData) : undefined; // Use cached data if available
    }
  });

  return { data, refetch, isLoading, error }; // Return refetch function
};
