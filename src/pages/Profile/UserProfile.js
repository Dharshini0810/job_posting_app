import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import countries from "./data/countries.json";
import { useParams } from "react-router-dom";
import {
  useGetUserProfilesQuery,
  useAddUserProfilesMutation,
  useUpdateUserProfileMutation,
} from "../../api/apiSlice";

const UserProfile = () => {
  const { userId } = useParams();
  const [image, setImage] = useState(null);
  const [formDetails, setFormDetails] = useState({
    id: userId || "",
    firstName: "",
    middleName: "",
    lastName: "",
    gender: "",
    dob: "",
    email: "",
    address: "",
    country: "",
    state: "",
    city: "",
    pincode: "",
    phoneNumber: "",
    education: [{ degree: "", institution: "", year: "" }],
    workExperience: [
      {
        company: "",
        role: "",
        startDate: "",
        endDate: "",
        responsibilities: "",
      },
    ],
    github: "",
    linkedin: "",
    website: "",
    resume: null,
  });
  const [isEditing, setIsEditing] = useState(true);
  const { data: userProfiles } = useGetUserProfilesQuery();

  const existingUserData = userProfiles?.find((user) => user.id === userId);

  const [addUserProfiles] = useAddUserProfilesMutation();
  const [updateUserProfile] = useUpdateUserProfileMutation();

  useEffect(() => {
    if (existingUserData) {
      setFormDetails(existingUserData);
      setIsEditing(false);
    }
  }, [existingUserData]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormDetails({ ...formDetails, [id]: value });
  };

  const handleGenderChange = (e) => {
    setFormDetails({ ...formDetails, gender: e.target.value });
  };

  const handleCountryChange = (e) => {
    const country = e.target.value;
    setFormDetails({ ...formDetails, country });
  };

  const handleAddEducation = () => {
    setFormDetails({
      ...formDetails,
      education: [
        ...formDetails.education,
        { degree: "", institution: "", year: "" },
      ],
    });
  };

  const handleEducationChange = (index, field, value) => {
    // Make a copy of the education array
    const updatedEducation = [...formDetails.education];

    // Update the specific field of the copied object
    updatedEducation[index] = {
      ...updatedEducation[index],
      [field]: value,
    };

    // Set the updated education array back to the state
    setFormDetails({
      ...formDetails,
      education: updatedEducation,
    });
  };

  const handleRemoveEducation = (index) => {
    setFormDetails({
      ...formDetails,
      education: formDetails.education.filter((_, i) => i !== index),
    });
  };
  const handleWorkExperienceChange = (index, field, value) => {
    // Create a copy of the work experience array
    const updatedExperience = [...formDetails.workExperience];

    // Create a new object for the specific work experience entry
    updatedExperience[index] = {
      ...updatedExperience[index],
      [field]: value,
    };

    // Update the state with the new array
    setFormDetails({
      ...formDetails,
      workExperience: updatedExperience,
    });
  };

  const handleAddWorkExperience = () => {
    setFormDetails({
      ...formDetails,
      workExperience: [
        ...formDetails.workExperience,
        {
          company: "",
          role: "",
          startDate: "",
          endDate: "",
          responsibilities: "",
        },
      ],
    });
  };

  const handleRemoveWorkExperience = (index) => {
    const updatedExperience = formDetails.workExperience.filter(
      (_, i) => i !== index
    );
    setFormDetails({ ...formDetails, workExperience: updatedExperience });
  };

  const handleLinkChange = (type, value) => {
    setFormDetails({ ...formDetails, [type]: value });
  };

  const handleResumeChange = (e) => {
    setFormDetails({ ...formDetails, resume: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the data to be sent
    const dataToSend = { id: userId, ...formDetails };

    try {
      if (existingUserData) {
        // Update existing company profile
        await updateUserProfile(dataToSend);
      } else {
        // Create a new company profile
        await addUserProfiles(formDetails);
      }

      // Switch to view mode after save
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving company profile:", error);
      // Handle error (show notification, etc.)
    }
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-24">
      {!isEditing && (
        <button
          type="button"
          onClick={toggleEdit}
          className="text-blue-500 hover:underline float-right mr-10"
        >
          <FontAwesomeIcon icon={faEdit} /> Edit
        </button>
      )}
      <h2 className="text-xl font-bold text-left ml-8">Personal Details</h2>
      <div className="flex p-6 space-x-6">
        {/* Left Side: Personal Details */}
        <div className="w-1/2 flex flex-col items-center p-6 border-r border-gray-300">
          <div className="relative mb-8">
            <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
              {image ? (
                <img
                  src={image}
                  alt="Profile"
                  className="object-cover w-full h-full"
                />
              ) : (
                <span className="text-gray-400">
                  <FontAwesomeIcon icon={faUser} size="3x" />
                </span>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={!isEditing}
              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>

          <div className="mb-8 w-full">
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700"
            >
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="firstName"
              value={formDetails.firstName}
              disabled={!isEditing}
              onChange={handleInputChange}
              required
              className="block w-full mt-2 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-8 w-full">
            <label
              htmlFor="middleName"
              className="block text-sm font-medium text-gray-700"
            >
              Middle Name
            </label>
            <input
              type="text"
              id="middleName"
              value={formDetails.middleName}
              disabled={!isEditing}
              onChange={handleInputChange}
              className="block w-full mt-2 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-8 w-full">
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-700"
            >
              Last Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="lastName"
              value={formDetails.lastName}
              onChange={handleInputChange}
              disabled={!isEditing}
              required
              className="block w-full mt-2 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-8 w-full">
            <label
              htmlFor="gender"
              className="block text-sm font-medium text-gray-700"
            >
              Gender <span className="text-red-500">*</span>
            </label>
            <div className="mt-2 flex space-x-6">
              {["female", "male", "other"].map((g) => (
                <div key={g} className="flex items-center">
                  <input
                    id={g}
                    name="gender"
                    type="radio"
                    value={g}
                    checked={formDetails.gender === g}
                    disabled={!isEditing}
                    onChange={handleGenderChange}
                    required
                    className="h-4 w-4 text-blue-600"
                  />
                  <label htmlFor={g} className="ml-2 text-sm text-gray-700">
                    {g.charAt(0).toUpperCase() + g.slice(1)}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-8 w-full">
            <label
              htmlFor="dob"
              className="block text-sm font-medium text-gray-700"
            >
              Date of Birth <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              id="dob"
              value={formDetails.dob}
              disabled={!isEditing}
              onChange={handleInputChange}
              required
              className="block w-full mt-2 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Right Side: Additional Details */}
        <div className="w-1/2 flex flex-col p-6">
          <div className="mb-8 w-full">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              value={formDetails.email}
              disabled={!isEditing}
              onChange={handleInputChange}
              required
              className="block w-full mt-2 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-8 w-full">
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700"
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              value={formDetails.address}
              disabled={!isEditing}
              onChange={handleInputChange}
              className="block w-full mt-2 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-8 w-full">
            <label
              htmlFor="country"
              className="block text-sm font-medium text-gray-700"
            >
              Country <span className="text-red-500">*</span>
            </label>
            <select
              id="country"
              value={formDetails.country}
              disabled={!isEditing}
              onChange={handleCountryChange}
              required
              className="block w-full mt-2 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>
                Select your country
              </option>
              {Object.keys(countries).map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-8 w-full">
            <label
              htmlFor="state"
              className="block text-sm font-medium text-gray-700"
            >
              State <span className="text-red-500">*</span>
            </label>
            <select
              id="state"
              value={formDetails.state}
              disabled={!isEditing}
              onChange={handleInputChange}
              required
              className="block w-full mt-2 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>
                Select your state
              </option>
              {formDetails.country && countries[formDetails.country]
                ? countries[formDetails.country].map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))
                : null}
            </select>
          </div>

          <div className="mb-8 w-full">
            <label
              htmlFor="city"
              className="block text-sm font-medium text-gray-700"
            >
              City <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="city"
              value={formDetails.city}
              disabled={!isEditing}
              onChange={handleInputChange}
              required
              className="block w-full mt-2 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-8 w-full">
            <label
              htmlFor="pincode"
              className="block text-sm font-medium text-gray-700"
            >
              Pincode <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="pincode"
              value={formDetails.pincode}
              disabled={!isEditing}
              onChange={handleInputChange}
              required
              className="block w-full mt-2 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-8 w-full">
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-medium text-gray-700"
            >
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="phoneNumber"
              value={formDetails.phoneNumber}
              disabled={!isEditing}
              onChange={handleInputChange}
              required
              className="block w-full mt-2 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
      <div className="mt-15 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-left mb-6">
          Educational Details
        </h2>
        {formDetails.education.map((edu, index) => (
          <div
            key={index}
            className="mb-6 border-t border-gray-300 pt-6 bg-gray-50 p-4 rounded-lg shadow-sm"
          >
            {isEditing && (
              <button
                type="button"
                className="text-red-500 hover:underline font-medium text-xl float-right mb-2"
                onClick={() => handleRemoveEducation(index)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            )}

            <div className="mb-4 w-full">
              <label
                htmlFor={`degree-${index}`}
                className="block text-sm font-semibold text-gray-800 mb-2"
              >
                Degree <span className="text-red-500">*</span>
              </label>
              <select
                id={`degree-${index}`}
                value={edu.degree}
                disabled={!isEditing}
                onChange={(e) =>
                  handleEducationChange(index, "degree", e.target.value)
                }
                required
                className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="">Select Degree</option>
                <option value="10th">10th</option>
                <option value="12th">12th</option>
                <option value="BE">BE</option>
                <option value="BTech">BTech</option>
                <option value="Others">Others</option>
              </select>
            </div>

            <div className="mb-4 w-full">
              <label
                htmlFor={`institution-${index}`}
                className="block text-sm font-semibold text-gray-800 mb-2"
              >
                Institution <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id={`institution-${index}`}
                value={edu.institution}
                disabled={!isEditing}
                onChange={(e) =>
                  handleEducationChange(index, "institution", e.target.value)
                }
                required
                className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div className="mb-4 w-full">
              <label
                htmlFor={`year-${index}`}
                className="block text-sm font-semibold text-gray-800 mb-2"
              >
                Year <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id={`year-${index}`}
                value={edu.year}
                disabled={!isEditing}
                onChange={(e) =>
                  handleEducationChange(index, "year", e.target.value)
                }
                required
                className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div className="mb-4 w-full">
              <label
                htmlFor={`scoreType-${index}`}
                className="block text-sm font-semibold text-gray-800 mb-2"
              >
                Score Type <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center">
                <label className="inline-flex items-center mr-4">
                  <input
                    type="radio"
                    name={`scoreType-${index}`}
                    value="Percentage"
                    checked={edu.scoreType === "Percentage"}
                    onChange={(e) =>
                      handleEducationChange(index, "scoreType", e.target.value)
                    }
                    disabled={!isEditing}
                    className="form-radio"
                  />
                  <span className="ml-2">Percentage</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name={`scoreType-${index}`}
                    value="CGPA"
                    checked={edu.scoreType === "CGPA"}
                    onChange={(e) =>
                      handleEducationChange(index, "scoreType", e.target.value)
                    }
                    disabled={!isEditing}
                    className="form-radio"
                  />
                  <span className="ml-2">CGPA</span>
                </label>
              </div>
            </div>

            <div className="mb-4 w-full">
              <label
                htmlFor={`score-${index}`}
                className="block text-sm font-semibold text-gray-800 mb-2"
              >
                Score <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id={`score-${index}`}
                value={edu.score}
                disabled={!isEditing}
                onChange={(e) =>
                  handleEducationChange(index, "score", e.target.value)
                }
                required
                className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>
        ))}

        {isEditing && (
          <button
            type="button"
            className="text-white hover:underline mt-4 font-medium bg-blue-500 px-3 py-2 rounded-md"
            onClick={handleAddEducation}
          >
            + Add
          </button>
        )}
      </div>
      <div className="mt-15 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-left mb-6">Work Experience</h2>
        {formDetails.workExperience.map((exp, index) => (
          <div
            key={index}
            className="mb-6 border-t border-gray-300 pt-6 bg-gray-50 p-4 rounded-lg shadow-sm"
          >
            {isEditing && (
              <button
                type="button"
                className="text-red-500 hover:underline font-medium text-xl float-right mb-2 "
                onClick={() => handleRemoveWorkExperience(index)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            )}
            <div className="mb-4 w-full">
              <label
                htmlFor={`company-${index}`}
                className="block text-sm font-semibold text-gray-800 mb-2"
              >
                Company <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id={`company-${index}`}
                value={exp.company}
                disabled={!isEditing}
                onChange={(e) =>
                  handleWorkExperienceChange(index, "company", e.target.value)
                }
                required
                className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div className="mb-4 w-full">
              <label
                htmlFor={`role-${index}`}
                className="block text-sm font-semibold text-gray-800 mb-2"
              >
                Role <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id={`role-${index}`}
                value={exp.role}
                disabled={!isEditing}
                onChange={(e) =>
                  handleWorkExperienceChange(index, "role", e.target.value)
                }
                required
                className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div className="flex justify-between">
              <div className="mb-4 w-[48%]">
                <label
                  htmlFor={`startDate-${index}`}
                  className="block text-sm font-semibold text-gray-800 mb-2"
                >
                  Start Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  id={`startDate-${index}`}
                  value={exp.startDate}
                  disabled={!isEditing}
                  onChange={(e) =>
                    handleWorkExperienceChange(
                      index,
                      "startDate",
                      e.target.value
                    )
                  }
                  required
                  className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="mb-4 w-[48%]">
                <label
                  htmlFor={`endDate-${index}`}
                  className="block text-sm font-semibold text-gray-800 mb-2"
                >
                  End Date
                </label>
                <input
                  type="date"
                  id={`endDate-${index}`}
                  value={exp.endDate}
                  disabled={!isEditing}
                  onChange={(e) =>
                    handleWorkExperienceChange(index, "endDate", e.target.value)
                  }
                  className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="mb-4 w-full">
              <label
                htmlFor={`responsibilities-${index}`}
                className="block text-sm font-semibold text-gray-800 mb-2"
              >
                Responsibilities <span className="text-red-500">*</span>
              </label>
              <textarea
                id={`responsibilities-${index}`}
                value={exp.responsibilities}
                disabled={!isEditing}
                onChange={(e) =>
                  handleWorkExperienceChange(
                    index,
                    "responsibilities",
                    e.target.value
                  )
                }
                required
                className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                rows="4"
              />
            </div>
          </div>
        ))}

        {isEditing && (
          <button
            type="button"
            className="text-white hover:underline mt-4 font-medium bg-blue-500 px-3 py-2 rounded-md"
            onClick={handleAddWorkExperience}
          >
            +Add
          </button>
        )}
      </div>

      <div className="mt-15 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-left mb-6">Links</h2>
        <div className="mb-4 w-full">
          <label
            htmlFor="github"
            className="block text-sm font-semibold text-gray-800 mb-2"
          >
            GitHub (optional)
          </label>
          <input
            type="url"
            id="github"
            value={formDetails.github}
            disabled={!isEditing}
            onChange={(e) => handleLinkChange("github", e.target.value)}
            className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div className="mb-4 w-full">
          <label
            htmlFor="linkedin"
            className="block text-sm font-semibold text-gray-800 mb-2"
          >
            LinkedIn (optional)
          </label>
          <input
            type="url"
            id="linkedin"
            value={formDetails.linkedin}
            disabled={!isEditing}
            onChange={(e) => handleLinkChange("linkedin", e.target.value)}
            className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div className="mb-4 w-full">
          <label
            htmlFor="website"
            className="block text-sm font-semibold text-gray-800 mb-2"
          >
            Website(optional)
          </label>
          <input
            type="url"
            id="website"
            value={formDetails.linkedin}
            disabled={!isEditing}
            onChange={(e) => handleLinkChange("website", e.target.value)}
            className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
      </div>

      <div className="mt-15 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-left mb-6">Resume Upload</h2>
        <div className="mb-4 w-full">
          {isEditing && (
            <label
              htmlFor="resume"
              className="block text-sm font-semibold text-gray-800 mb-2"
            >
              Upload Resume <span className="text-red-500">*</span>
            </label>
          )}
          <input
            type="file"
            id="resume"
            onChange={handleResumeChange}
            disabled={!isEditing}
            required
            className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          {formDetails.resume && (
            <p className="mt-2 text-gray-600">{formDetails.resume.name}</p>
          )}
        </div>
      </div>

      {isEditing && (
        <div className="flex justify-end mt-8">
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-700 transition-colors"
          >
            {userId ? "Update Profile" : "Create Profile"}
          </button>
        </div>
      )}
    </form>
  );
};

export default UserProfile;
