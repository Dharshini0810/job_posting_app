import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { useGetCompanyProfilesQuery, useAddCompanyProfileMutation, useUpdateCompanyProfileMutation } from '../../api/apiSlice';
import { useParams,useNavigate } from 'react-router-dom';

const CompanyProfile = () => {
  const { companyId } = useParams();
  const navigate = useNavigate();
  const [companyData, setCompanyData] = useState({
    id: companyId || '',
    logo: '',
    name: '',
    tagline: '',
    locations: [''],  // Initialize with one empty location
    about: '',
    contact: {
      phone: '',
      email: '',
    },
  });
  const [isEditing, setIsEditing] = useState(true); // Start in edit mode if no companyId (new profile)
  
  const { data: companyProfiles } = useGetCompanyProfilesQuery();

  // Find the company data based on companyId
  const existingCompanyData = companyProfiles?.find((company) => company.id === companyId);

  
  const [addCompanyProfile] = useAddCompanyProfileMutation();
  const [updateCompanyProfile] = useUpdateCompanyProfileMutation();

  // Prefill the form with existing data when editing
  useEffect(() => {
    if (existingCompanyData) {
      setCompanyData(existingCompanyData);
      setIsEditing(false); // Switch to view mode once data is loaded
    }
  }, [existingCompanyData]);

  console.log(companyData)

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setCompanyData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleLocationChange = (index, value) => {
    const newLocations = [...companyData.locations];
    newLocations[index] = value;
    setCompanyData((prev) => ({
      ...prev,
      locations: newLocations,
    }));
  };

  const handleAddLocation = () => {
    setCompanyData((prev) => ({
      ...prev,
      locations: [...prev.locations, ''],
    }));
  };

  const handleRemoveLocation = (index) => {
    if (companyData.locations.length > 1) {
      const newLocations = companyData.locations.filter((_, i) => i !== index);
      setCompanyData((prev) => ({
        ...prev,
        locations: newLocations,
      }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setCompanyData((prev) => ({
      ...prev,
      logo: URL.createObjectURL(file),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Prepare the data to be sent
    const dataToSend = { id: companyId, ...companyData };
  
    try {
      if (existingCompanyData) {
        // Update existing company profile
        await updateCompanyProfile(dataToSend);
      } else {
        // Create a new company profile
        await addCompanyProfile(companyData);
      }
  
      // Switch to view mode after save
      setIsEditing(false);
      navigate(`company/${companyId}/postjobs`)
      
    } catch (error) {
      console.error("Error saving company profile:", error);
      // Handle error (show notification, etc.)
    }

  };
  

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleRedirection = () =>{
    navigate(`/company/${companyId}/postjobs`);
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 mt-20 bg-white rounded-lg shadow-md max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        {!isEditing && (
          <button
            type="button"
            onClick={toggleEdit}
            className="text-blue-500 hover:underline"
          >
            <FontAwesomeIcon icon={faEdit} /> Edit
          </button>
        )}
      </div>

      {/* Company Logo */}
      <div className="mb-6">
        <label htmlFor="logo" className="block text-sm font-medium text-gray-700 mb-2">
          Company Logo
        </label>
        <input
          type="file"
          id="logo"
          accept="image/*"
          onChange={handleFileChange}
          disabled={!isEditing}
          className="block w-full border-gray-300 text-gray-600 file:bg-gray-200 file:py-2 file:px-4 file:border file:rounded-md file:text-sm file:font-medium"
        />
      </div>

      {/* Company Name */}
      <div className="mb-6">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
          Company Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          value={companyData.name}
          onChange={handleInputChange}
          required
          disabled={!isEditing}
          className="block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      {/* Tagline */}
      <div className="mb-6">
        <label htmlFor="tagline" className="block text-sm font-medium text-gray-700 mb-2">
          Tagline
        </label>
        <input
          type="text"
          id="tagline"
          value={companyData.tagline}
          onChange={handleInputChange}
          disabled={!isEditing}
          className="block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      {/* Locations */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Locations
        </label>
        {Array.isArray(companyData.locations) && companyData.locations.map((location, index) => (
          <div key={index} className="flex items-center mb-2">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="text-blue-500 mr-2" />
            <input
              type="text"
              value={location}
              onChange={(e) => handleLocationChange(index, e.target.value)}
              disabled={!isEditing}
              className="flex-grow px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {isEditing && companyData.locations.length > 1 && (
              <button
                type="button"
                onClick={() => handleRemoveLocation(index)}
                className="ml-2 text-red-500 hover:underline"
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            )}
          </div>
        ))}
        {isEditing && (
          <button
            type="button"
            onClick={handleAddLocation}
            className="text-blue-500 hover:underline"
          >
            + Add Location
          </button>
        )}
      </div>

      {/* About */}
      <div className="mb-6">
        <label htmlFor="about" className="block text-sm font-medium text-gray-700 mb-2">
          About Us
        </label>
        <textarea
          id="about"
          value={companyData.about}
          onChange={handleInputChange}
          rows="4"
          disabled={!isEditing}
          className="block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      {/* Contact Details */}
      <div className="mb-6">
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
          Phone <span className="text-red-500">*</span>
        </label>
        <input
          type="tel"
          id="phone"
          value={companyData.contact?.phone || ''} // Handle undefined values
          onChange={(e) =>
            setCompanyData((prev) => ({
              ...prev,
              contact: { ...prev.contact, phone: e.target.value },
            }))
          }
          required
          disabled={!isEditing}
          className="block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          value={companyData.contact?.email || ''} // Handle undefined values
          onChange={(e) =>
            setCompanyData((prev) => ({
              ...prev,
              contact: { ...prev.contact, email: e.target.value },
            }))
          }
          required
          disabled={!isEditing}
          className="block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      {/* Submit Button */}
      {isEditing && (
        <div className="flex justify-end mt-8">
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-700 transition-colors"
          >
            {companyId ? 'Update Profile' : 'Create Profile'}
          </button>
        </div>
      )}
      {!isEditing &&
      <div className="flex justify-end mt-8">
      <button
        type="button"
        onClick={handleRedirection}
        className="bg-blue-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-700 transition-colors"
      >
        Redirect to Post Jobs
      </button>
    </div>
      }
    </form>
  );
};

export default CompanyProfile;
