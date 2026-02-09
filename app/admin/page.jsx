"use client";

import { useState, useEffect } from "react";
import {
  doc,
  getDoc,
  setDoc,
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  addDoc,
  writeBatch,
} from "firebase/firestore";
import { CldImage, CldUploadWidget } from "next-cloudinary";
import { AuthWrapper } from "../components/AuthWrapper";
import { db } from "../lib/firebase";
import LoadingSpinner from "../components/LoadingSpinner";

const defaultHero = {
  headline: "",
  imageUrl: "",
  resumeUrl: "",
};

const defaultService = {
  title: "",
  description: "",
  icon: "Brush",
  order: 0,
};

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("projects");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [hero, setHero] = useState(defaultHero);
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState(defaultService);
  const [skills, setSkills] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [siteInfo, setSiteInfo] = useState({});
  const [newSkill, setNewSkill] = useState({ name: "", value: 0 });
  const [newContact, setNewContact] = useState({
    name: "",
    url: "",
    icon: "",
    color: "#3B82F6",
  });

  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({ id: "", title: "" });
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    category: "",
    images: [],
    show_in_home: false,
    createdAt: new Date().toISOString(),
  });

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      const [
        heroSnap,
        servicesSnap,
        skillsSnap,
        contactsSnap,
        siteSnap,
        categoriesSnap,
      ] = await Promise.all([
        getDoc(doc(db, "content", "hero")),
        getDocs(collection(db, "services")),
        getDocs(collection(db, "skills")),
        getDocs(collection(db, "contacts")),
        getDoc(doc(db, "content", "site_info")),
        getDocs(collection(db, "categories")),
      ]);

      setHero(heroSnap.data() || defaultHero);
      setServices(servicesSnap.docs.map((d) => ({ id: d.id, ...d.data() })));
      setSkills(skillsSnap.docs.map((d) => d.data()));
      setContacts(contactsSnap.docs.map((d) => ({ id: d.id, ...d.data() })));
      setSiteInfo(siteSnap.data() || {});

      const categoriesData = categoriesSnap.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));
      setCategories(categoriesData);
      setNewProject((p) => ({
        ...p,
        category: categoriesData[0]?.id || "",
        images: [],
      }));
    } catch (err) {
      setError("Failed to load data: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const saveContent = async (collectionName, data, idField = "id") => {
    try {
      if (data[idField]) {
        await setDoc(doc(db, collectionName, data[idField]), data, {
          merge: true,
        });
      } else {
        await addDoc(collection(db, collectionName), data);
      }
      return true;
    } catch (err) {
      setError(`Error saving ${collectionName}: ${err.message}`);
      return false;
    }
  };

  const handleHeroSave = async () => {
    if (await saveContent("content", { ...hero, id: "hero" })) {
      setSuccess("Hero section updated!");
    }
  };

  const handleServiceSave = async (service) => {
    if (await saveContent("services", service)) {
      setSuccess("Service saved!");
      fetchAllData();
    }
  };

  const handleServiceUpdate = (id, field, value) => {
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [field]: value } : s))
    );
  };

  const sanitizeId = (str) => {
    return str.replace(/[^a-zA-Z0-9]/g, "-").toLowerCase();
  };

  const handleSkillSave = async () => {
    try {
      if (!skills || skills.length === 0) {
        throw new Error("No skills to save.");
      }

      const invalidSkills = skills.filter(
        (skill) => !skill.name || !skill.value
      );
      if (invalidSkills.length > 0) {
        throw new Error(
          `Invalid skills found: ${invalidSkills
            .map((s) => s.name || "Unnamed Skill")
            .join(", ")}`
        );
      }

      const batch = writeBatch(db);

      skills.forEach((skill) => {
        const skillId = sanitizeId(skill.name);
        const skillRef = doc(db, "skills", skillId);
        batch.set(skillRef, skill);
      });

      await batch.commit();
      setSuccess("Skills updated successfully!");
    } catch (err) {
      console.error("Error saving skills:", err);
      setError("Error saving skills: " + err.message);
    }
  };

  const handleContactSave = async (contact) => {
    if (await saveContent("contacts", contact)) {
      setSuccess("Contact updated!");
      fetchAllData();
    }
  };

  const handleAddService = async () => {
    try {
      await addDoc(collection(db, "services"), newService);
      setSuccess("Service added!");
      setNewService(defaultService);
      fetchAllData();
    } catch (err) {
      setError("Error adding service");
    }
  };

  const handleAddSkill = () => {
    setSkills([...skills, newSkill]);
    setNewSkill({ name: "", value: 0, createdAt: new Date().toISOString() });
  };

  const handleAddContact = async () => {
    try {
      await addDoc(collection(db, "contacts"), newContact);
      setSuccess("Contact added!");
      setNewContact({ name: "", url: "", icon: "", color: "#3B82F6" });
      fetchAllData();
    } catch (err) {
      setError("Error adding contact");
    }
  };

  const handleDeleteContent = async (collectionName, id) => {
    if (!confirm(`Delete this ${collectionName.slice(0, -1)}?`)) return;
    try {
      await deleteDoc(doc(db, collectionName, id));
      setSuccess(`${collectionName.slice(0, -1)} deleted!`);
      fetchAllData();
    } catch (err) {
      setError(`Error deleting ${collectionName.slice(0, -1)}`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      if (!newProject.category) throw new Error("Please select a category");
      if (newProject.images.length === 0)
        throw new Error("At least one image is required");

      const categoryRef = doc(db, "categories", newProject.category);
      const categorySnap = await getDoc(categoryRef);

      if (!categorySnap.exists()) throw new Error("Category not found");

      const projectId = Date.now().toString();
      const updatedProjects = [
        ...(categorySnap.data().projects || []),
        { ...newProject, id: projectId },
      ];

      await updateDoc(categoryRef, { projects: updatedProjects });

      setSuccess("Project added successfully!");
      setNewProject({
        title: "",
        description: "",
        category: categories[0]?.id || "",
        images: [],
      });
      fetchAllData();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (projectId, categoryId) => {
    if (!confirm("Delete this project?")) return;

    try {
      const categoryRef = doc(db, "categories", categoryId);
      const categorySnap = await getDoc(categoryRef);

      if (categorySnap.exists()) {
        const updatedProjects = categorySnap
          .data()
          .projects.filter((project) => project.id !== projectId);

        await updateDoc(categoryRef, { projects: updatedProjects });
        setSuccess("Project deleted!");
        fetchAllData();
      }
    } catch (err) {
      setError("Error deleting project: " + err.message);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    if (!confirm("Delete this category and all its projects?")) return;

    try {
      await deleteDoc(doc(db, "categories", categoryId));
      setCategories(categories.filter((cat) => cat.id !== categoryId));
      setSuccess("Category deleted!");
      fetchAllData();
    } catch (err) {
      setError("Error deleting category: " + err.message);
    }
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!newCategory.id || !newCategory.title) {
      setError("Category ID and Title are required");
      return;
    }

    try {
      await setDoc(doc(db, "categories", newCategory.id), {
        title: newCategory.title,
        projects: [],
      });
      setCategories([...categories, newCategory]);
      setNewCategory({ id: "", title: "" });
      setSuccess("Category added successfully!");

      setNewProject((prev) => ({ ...prev, category: newCategory.id }));
    } catch (error) {
      setError("Error adding category");
    }
  };

  const handleImageUpload = (result, field) => {
    const url = result.info.secure_url;
    switch (field) {
      case "hero":
        setHero((prev) => ({ ...prev, imageUrl: url }));
        break;
      case "resume":
        setHero((prev) => ({ ...prev, resumeUrl: url }));
        break;
      case "project":
        setNewProject((prev) => ({ ...prev, images: [...prev.images, url] }));
        break;
    }
  };

  const handleRemoveImage = (indexToRemove) => {
    setNewProject((prev) => ({
      ...prev,
      images: prev.images.filter((_, index) => index !== indexToRemove),
    }));
  };

  const clearMessages = () => {
    setError("");
    setSuccess("");
  };

  return (
    <AuthWrapper>
      <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-4 items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">Portfolio Admin</h1>
            <div className="flex gap-4">
              <button
                onClick={() => setActiveTab("content")}
                className={`px-4 py-2 rounded-lg ${
                  activeTab === "content"
                    ? "bg-blue-600"
                    : "bg-gray-800 hover:bg-gray-700"
                }`}
              >
                Content
              </button>
              <button
                onClick={() => setActiveTab("projects")}
                className={`px-4 py-2 rounded-lg ${
                  activeTab === "projects"
                    ? "bg-blue-600"
                    : "bg-gray-800 hover:bg-gray-700"
                }`}
              >
                Projects
              </button>
              <button
                onClick={() => {
                  localStorage.removeItem("adminToken");
                  window.location.href = "/login";
                }}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg"
              >
                Logout
              </button>
            </div>
          </div>

          {(error || success) && (
            <div
              className={`mb-6 p-4 rounded-lg ${
                error
                  ? "bg-red-500/20 text-red-300"
                  : "bg-green-500/20 text-green-300"
              }`}
            >
              {error || success}
              <button onClick={clearMessages} className="float-right font-bold">
                ×
              </button>
            </div>
          )}

          {activeTab === "content" && (
            <div className="space-y-8">
              <div className="bg-gray-800 p-6 rounded-xl">
                <h2 className="text-xl font-semibold mb-4">Hero Section</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Headline"
                      value={hero.headline}
                      onChange={(e) =>
                        setHero({ ...hero, headline: e.target.value })
                      }
                      className="w-full p-3 bg-gray-700 rounded"
                    />
                    <CldUploadWidget
                      signatureEndpoint="/api/sign-image"
                      onSuccess={(result) => handleImageUpload(result, "hero")}
                    >
                      {({ open }) => (
                        <button
                          type="button"
                          onClick={open}
                          className="w-full p-4 bg-gray-700 rounded hover:bg-gray-600"
                        >
                          {hero.imageUrl
                            ? "Change Image"
                            : "Upload Profile Image"}
                        </button>
                      )}
                    </CldUploadWidget>
                    <CldUploadWidget
                      signatureEndpoint="/api/sign-image"
                      onSuccess={(result) =>
                        handleImageUpload(result, "resume")
                      }
                    >
                      {({ open }) => (
                        <button
                          type="button"
                          onClick={open}
                          className="w-full p-4 bg-gray-700 rounded hover:bg-gray-600"
                        >
                          {hero.resumeUrl
                            ? "Change Resume"
                            : "Upload Resume PDF"}
                        </button>
                      )}
                    </CldUploadWidget>
                    <button
                      onClick={handleHeroSave}
                      className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded"
                    >
                      Save Hero Section
                    </button>
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    {hero.imageUrl && (
                      <CldImage
                        width="400"
                        height="400"
                        src={hero.imageUrl}
                        alt="Hero Preview"
                        className="rounded-lg border-2 border-gray-600"
                      />
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 p-6 rounded-xl">
                <h2 className="text-xl font-semibold mb-4">Services</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gray-700 p-4 rounded-lg">
                    <input
                      type="text"
                      placeholder="Service Title"
                      value={newService.title}
                      onChange={(e) =>
                        setNewService({ ...newService, title: e.target.value })
                      }
                      className="w-full mb-2 p-2 bg-gray-600 rounded"
                    />
                    <textarea
                      placeholder="Description"
                      value={newService.description}
                      onChange={(e) =>
                        setNewService({
                          ...newService,
                          description: e.target.value,
                        })
                      }
                      className="w-full mb-2 p-2 bg-gray-600 rounded h-24"
                    />
                    <select
                      value={newService.icon}
                      onChange={(e) =>
                        setNewService({ ...newService, icon: e.target.value })
                      }
                      className="w-full mb-2 p-2 bg-gray-600 rounded"
                    >
                      <option value="Brush">Brush</option>
                      <option value="Camera">Camera</option>
                      <option value="Code">Code</option>
                      <option value="LayoutGrid">Layout Grid</option>
                    </select>
                    <button
                      onClick={handleAddService}
                      className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded"
                    >
                      Add New Service
                    </button>
                  </div>

                  {services.map((service) => (
                    <div
                      key={service.id}
                      className="bg-gray-700 p-4 rounded-lg"
                    >
                      <button
                        onClick={() =>
                          handleDeleteContent("services", service.id)
                        }
                        className="mt-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-800 p-6 rounded-xl">
                <h2 className="text-xl font-semibold mb-4">Skills</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gray-700 p-4 rounded-lg">
                    <input
                      type="text"
                      placeholder="Skill Name"
                      value={newSkill.name}
                      onChange={(e) =>
                        setNewSkill({ ...newSkill, name: e.target.value })
                      }
                      className="w-full mb-2 p-2 bg-gray-600 rounded"
                    />
                    <input
                      type="number"
                      placeholder="Skill Value"
                      value={newSkill.value}
                      onChange={(e) =>
                        setNewSkill({ ...newSkill, value: e.target.value })
                      }
                      className="w-full mb-2 p-2 bg-gray-600 rounded"
                    />
                    <button
                      onClick={handleAddSkill}
                      className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded"
                    >
                      Add Skill to List
                    </button>
                  </div>

                  <div className="space-y-4">
                    {skills.map((skill, index) => (
                      <div key={index} className="bg-gray-700 p-4 rounded-lg">
                        <input
                          type="text"
                          value={skill.name}
                          onChange={(e) => {
                            const updatedSkills = [...skills];
                            updatedSkills[index].name = e.target.value;
                            setSkills(updatedSkills);
                          }}
                          className="w-full mb-2 p-2 bg-gray-600 rounded"
                        />
                        <input
                          type="number"
                          value={skill.value}
                          onChange={(e) => {
                            const updatedSkills = [...skills];
                            updatedSkills[index].value = e.target.value;
                            setSkills(updatedSkills);
                          }}
                          className="w-full mb-2 p-2 bg-gray-600 rounded"
                        />
                        <button
                          onClick={() => {
                            const newSkills = [...skills];
                            newSkills.splice(index, 1);
                            setSkills(newSkills);
                          }}
                          className="mt-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                <button
                  onClick={handleSkillSave}
                  className="mt-4 w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded"
                >
                  Save All Skills
                </button>
              </div>

              <div className="bg-gray-800 p-6 rounded-xl">
                <h2 className="text-xl font-semibold mb-4">Contacts</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gray-700 p-4 rounded-lg">
                    <input
                      type="text"
                      placeholder="Contact Name"
                      value={newContact.name}
                      onChange={(e) =>
                        setNewContact({ ...newContact, name: e.target.value })
                      }
                      className="w-full mb-2 p-2 bg-gray-600 rounded"
                    />
                    <input
                      type="url"
                      placeholder="Contact URL"
                      value={newContact.url}
                      onChange={(e) =>
                        setNewContact({ ...newContact, url: e.target.value })
                      }
                      className="w-full mb-2 p-2 bg-gray-600 rounded"
                    />
                    <input
                      type="text"
                      placeholder="Icon Name"
                      value={newContact.icon}
                      onChange={(e) =>
                        setNewContact({ ...newContact, icon: e.target.value })
                      }
                      className="w-full mb-2 p-2 bg-gray-600 rounded"
                    />
                    <input
                      type="color"
                      value={newContact.color}
                      onChange={(e) =>
                        setNewContact({ ...newContact, color: e.target.value })
                      }
                      className="w-full mb-2 p-2 bg-gray-600 rounded h-10"
                    />
                    <button
                      onClick={handleAddContact}
                      className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded"
                    >
                      Add New Contact
                    </button>
                  </div>

                  {contacts.map((contact) => (
                    <div
                      key={contact.id}
                      className="bg-gray-700 p-4 rounded-lg"
                    >
                      <button
                        onClick={() =>
                          handleDeleteContent("contacts", contact.id)
                        }
                        className="mt-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "projects" && (
            <div className="space-y-8">
              <div className="bg-gray-800 p-6 rounded-xl">
                <h2 className="text-xl font-semibold mb-4">Categories</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Category ID (e.g., web-design)"
                      value={newCategory.id}
                      onChange={(e) =>
                        setNewCategory({ ...newCategory, id: e.target.value })
                      }
                      className="w-full p-3 bg-gray-700 rounded"
                    />
                    <input
                      type="text"
                      placeholder="Category Title"
                      value={newCategory.title}
                      onChange={(e) =>
                        setNewCategory({
                          ...newCategory,
                          title: e.target.value,
                        })
                      }
                      className="w-full p-3 bg-gray-700 rounded"
                    />
                    <button
                      onClick={handleAddCategory}
                      className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded"
                    >
                      Add New Category
                    </button>
                  </div>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div
                        key={category.id}
                        className="flex justify-between items-center bg-gray-700 p-3 rounded"
                      >
                        <span className="font-mono">{category.id}</span>
                        <span>{category.title}</span>
                        <button
                          onClick={() => handleDeleteCategory(category.id)}
                          className="text-red-400 hover:text-red-300"
                        >
                          Delete
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 p-6 rounded-xl">
                <h2 className="text-xl font-semibold mb-4">Add New Project</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <input
                        type="text"
                        placeholder="Project Title"
                        value={newProject.title}
                        onChange={(e) =>
                          setNewProject({
                            ...newProject,
                            title: e.target.value,
                          })
                        }
                        className="w-full p-3 bg-gray-700 rounded"
                        required
                      />
                      <textarea
                        placeholder="Project Description"
                        value={newProject.description}
                        onChange={(e) =>
                          setNewProject({
                            ...newProject,
                            description: e.target.value,
                          })
                        }
                        className="w-full p-3 bg-gray-700 rounded h-32"
                        required
                      />
                      <select
                        value={newProject.category}
                        onChange={(e) =>
                          setNewProject({
                            ...newProject,
                            category: e.target.value,
                          })
                        }
                        className="w-full p-3 bg-gray-700 rounded"
                        required
                      >
                        <option value="" disabled>
                          Select Category
                        </option>
                        {categories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.title}
                          </option>
                        ))}
                      </select>
                      <label className="flex items-center gap-2 mt-4">
                        <input
                          type="checkbox"
                          checked={newProject.show_in_home}
                          onChange={(e) =>
                            setNewProject({
                              ...newProject,
                              show_in_home: e.target.checked,
                            })
                          }
                          className="form-checkbox h-5 w-5 text-blue-600"
                        />
                        <span className="text-gray-300">Show on Homepage</span>
                      </label>
                    </div>
                    <div className="space-y-4">
                      <CldUploadWidget
                        signatureEndpoint="/api/sign-image"
                        onSuccess={(result) =>
                          handleImageUpload(result, "project")
                        }
                      >
                        {({ open }) => (
                          <div className="border-2 border-dashed border-gray-600 rounded-lg p-4 text-center">
                            {newProject.images.length > 0 ? (
                              <div className="flex flex-wrap gap-2 mb-2">
                                {newProject.images.map((image, index) => (
                                  <div key={index} className="relative">
                                    <CldImage
                                      src={image}
                                      width="100"
                                      height="100"
                                      alt={`Preview ${index + 1}`}
                                      className="rounded-lg"
                                    />
                                    <button
                                      type="button"
                                      onClick={() => handleRemoveImage(index)}
                                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                                    >
                                      ×
                                    </button>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <p className="text-gray-400 mb-2">
                                No images selected
                              </p>
                            )}
                            <button
                              type="button"
                              onClick={open}
                              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg"
                            >
                              {newProject.images.length > 0
                                ? "Add More Images"
                                : "Upload Images"}
                            </button>
                          </div>
                        )}
                      </CldUploadWidget>
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg"
                  >
                    {loading ? "Adding Project..." : "Add Project"}
                  </button>
                </form>
              </div>

              <div className="space-y-8">
                {categories.map((category) => (
                  <div key={category.id} className="bg-gray-800 p-6 rounded-xl">
                    <h3 className="text-lg font-medium mb-4">
                      {category.title}
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {category.projects?.map((project) => (
                        <div
                          key={project.id}
                          className="bg-gray-700 p-4 rounded-lg"
                        >
                          <h4 className="text-lg font-semibold">
                            {project.title}
                          </h4>
                          <p className="text-gray-300">{project.description}</p>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {project.images.map((image, index) => (
                              <CldImage
                                key={index}
                                src={image}
                                width="100"
                                height="100"
                                alt={`${project.title} image ${index + 1}`}
                                className="rounded-lg"
                              />
                            ))}
                          </div>
                          <div className="mt-2 flex items-center gap-2">
                            <span className="text-sm text-gray-400">
                              Show on Homepage:
                            </span>
                            <span
                              className={`text-sm ${
                                project.show_in_home
                                  ? "text-green-400"
                                  : "text-red-400"
                              }`}
                            >
                              {project.show_in_home ? "Yes" : "No"}
                            </span>
                          </div>
                          <button
                            onClick={() =>
                              handleDelete(project.id, category.id)
                            }
                            className="mt-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg"
                          >
                            Delete
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </AuthWrapper>
  );
}
