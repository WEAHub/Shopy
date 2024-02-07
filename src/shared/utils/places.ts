/* eslint-disable @typescript-eslint/no-explicit-any */
import { AddressLocation } from '@shared/interfaces/location/location';

function getLocationDataByType(address: any, type: string): string {
  return address?.address_components?.find((a: any) =>
    a?.types.includes(type)
  )?.long_name;
}

export function processLocation(googleAddress: any): AddressLocation {
  const address = googleAddress.formatted_address;
  const province = getLocationDataByType(
    googleAddress,
    'administrative_area_level_2'
  );
  const street = getLocationDataByType(googleAddress, 'route');
  const streetNumber = getLocationDataByType(
    googleAddress,
    'street_number'
  );
  const locality = getLocationDataByType(googleAddress, 'locality');
  const postalCode = getLocationDataByType(googleAddress, 'postal_code');
  const lat = googleAddress?.geometry?.location?.lat().toString();
  const lng = googleAddress?.geometry?.location?.lng().toString();

  const location: AddressLocation = {
    address,
    lat,
    lng,
    province,
    street,
    streetNumber,
    locality,
    postalCode,
  };

  return location;
}
