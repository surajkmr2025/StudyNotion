import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiUpload } from "react-icons/fi";
import IconBtn from "../../../common/IconBtn";
import { updateDisplayPicture } from "../../../../services/operations/SettingsAPI";

const ChangeProfilePicture = () => {
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [previewSource, setPreviewSource] = useState(null);

    // Hidden <input type="file"> triggered programmatically on button click
    const fileInputRef = useRef(null);

    const handleClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        // ✅ REMOVED: console.log statements that printed file metadata.
        // File validation errors are shown via alert (or could be via toast)
        // without needing to log internal state.

        if (!file) return;

        // Enforce a 5 MB size limit
        if (file.size > 5 * 1024 * 1024) {
            alert("File size should be less than 5MB");
            return;
        }

        // Enforce allowed MIME types
        const validTypes = ["image/png", "image/gif", "image/jpeg", "image/jpg"];
        if (!validTypes.includes(file.type)) {
            alert("Please select a valid image file (PNG, JPG, or GIF)");
            return;
        }

        setImageFile(file);
    };

    // Generate a data-URL preview of the selected file using FileReader
    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result);
        };
    };

    // Re-generate the preview whenever the user picks a new file
    useEffect(() => {
        if (imageFile) {
            previewFile(imageFile);
        }
    }, [imageFile]);

    const handleFileUpload = async () => {
        // Guard: no file selected
        if (!imageFile) {
            alert("Please select an image first.");
            return;
        }

        try {
            setLoading(true);

            const formData = new FormData();
            formData.append("displayPicture", imageFile);

            // ✅ REMOVED: the verbose console.logs around FormData creation,
            // token presence, request dispatch, and upload success.
            // The toast notifications in updateDisplayPicture give the user
            // all the feedback they need.

            await dispatch(updateDisplayPicture(token, formData));

            // Reset local state after a successful upload
            setImageFile(null);
            setPreviewSource(null);
        } catch (error) {
            console.error("Upload failed:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="rounded-lg border border-richblack-700 bg-richblack-800 p-6 md:p-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

                {/* Avatar preview */}
                <div className="flex items-center gap-5">
                    <img
                        src={previewSource || user?.image}
                        alt={`profile-${user?.firstName}`}
                        className="h-20 w-20 rounded-full object-cover ring-2 ring-richblack-600"
                    />
                    <div className="space-y-2">
                        <p className="text-lg font-semibold text-richblack-5">
                            Change Profile Picture
                        </p>
                        <p className="text-sm text-richblack-300">
                            JPG, PNG or GIF (max 5MB)
                        </p>
                        {imageFile && (
                            <p className="text-xs text-caribbeangreen-200">
                                ✓ {imageFile.name} selected
                            </p>
                        )}
                    </div>
                </div>

                {/* Controls */}
                <div className="flex flex-wrap items-center gap-3">
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                        accept="image/png, image/gif, image/jpeg, image/jpg"
                    />

                    <button
                        onClick={handleClick}
                        disabled={loading}
                        className="rounded-md border border-richblack-600 bg-richblack-700 px-5 py-2
                        font-medium text-richblack-50 transition-all hover:bg-richblack-600
                        disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        Select Image
                    </button>

                    <IconBtn
                        text={loading ? "Uploading..." : "Upload"}
                        onClick={handleFileUpload}
                        disabled={loading || !imageFile}
                        customClasses="bg-yellow-50 text-richblack-900 hover:bg-yellow-100 disabled:opacity-60"
                    >
                        {!loading && <FiUpload className="text-lg" />}
                    </IconBtn>
                </div>
            </div>
        </div>
    );
};

export default ChangeProfilePicture;
