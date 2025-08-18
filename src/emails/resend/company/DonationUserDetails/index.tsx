import React from 'react';
interface DonationUserDetailsEmailProps {
  firstName: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  country?: string;
  state?: string;
  city?: string;
  address?: string;
  zipCode?: string;
  comments?: string;
}
const DonationUserDetailsEmail = (props: DonationUserDetailsEmailProps) => {
  return (
    <div>
      {' '}
      <h1>Thank you, {props.firstName}! for your donation</h1> <br />{' '}
      <div>
        {' '}
        {props.lastName && (
          <p>
            {' '}
            Name: {props.firstName} {props.lastName}{' '}
          </p>
        )}{' '}
        {props.email && <p>Email: {props.email}</p>}{' '}
        {props.phoneNumber && <p>Phone Number: {props.phoneNumber}</p>}{' '}
        {props.country && <p>Country: {props.country}</p>}{' '}
        {props.state && <p>State: {props.state}</p>} {props.city && <p>City: {props.city}</p>}{' '}
        {props.address && <p>Address: {props.address}</p>}{' '}
        {props.zipCode && <p>Zip Code: {props.zipCode}</p>}{' '}
        {props.comments && <p>Comments: {props.comments}</p>}{' '}
      </div>{' '}
    </div>
  );
};
export default DonationUserDetailsEmail;
