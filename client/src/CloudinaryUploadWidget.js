// // // CloudinaryUploadWidget.js
// // import React, { useEffect } from "react";
// // import { cloudinaryConfig } from './cloudinaryConfig'; // Import your config

// // const CloudinaryUploadWidget = ({ onUploadSuccess }) => {
// //   useEffect(() => {
// //     // Make sure the script is loaded before initializing the widget
// //     const script = document.createElement("script");
// //     script.src = "https://widget.cloudinary.com/v2.0/global/all.js";
// //     script.type = "text/javascript";
// //     document.head.appendChild(script);

// //     script.onload = () => {
// //       window.cloudinary.openUploadWidget(
// //         {
// //           cloudName: cloudinaryConfig.cloudName, // Using the imported cloudName
// //           uploadPreset: cloudinaryConfig.uploadPreset, // Using the imported uploadPreset
// //           sources: ["local", "url"], // Define where you want users to upload images from
// //           showAdvancedOptions: true,
// //           cropping: true,
// //           multiple: false,
// //         },
// //         (error, result) => {
// //           if (result && result.event === "success") {
// //             // Handle the uploaded file URL or data here
// //             onUploadSuccess(result.info.secure_url);
// //           }
// //         }
// //       );
// //     };

// //     return () => {
// //       document.head.removeChild(script);
// //     };
// //   }, []);

// //   const openWidget = () => {
// //     window.cloudinary.openUploadWidget(
// //       {
// //         cloudName: cloudinaryConfig.cloudName,
// //         uploadPreset: cloudinaryConfig.uploadPreset,
// //         sources: ["local", "url"],
// //         showAdvancedOptions: true,
// //         cropping: true,
// //         multiple: false,
// //       },
// //       (error, result) => {
// //         if (result && result.event === "success") {
// //           onUploadSuccess(result.info.secure_url);
// //         }
// //       }
// //     );
// //   };

// //   return (
// //     <div>
// //       <button onClick={openWidget} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
// //         Upload MRI Scan
// //       </button>
// //     </div>
// //   );
// // };

// // export default CloudinaryUploadWidget;
// // CloudinaryUploadWidget.js
// import React, { useEffect } from "react";
// import { cloudinaryConfig } from './cloudinaryConfig'; // Import your config

// const CloudinaryUploadWidget = ({ onUploadSuccess }) => {
//   useEffect(() => {
//     // Make sure the script is loaded before initializing the widget
//     const script = document.createElement("script");
//     script.src = "https://widget.cloudinary.com/v2.0/global/all.js";
//     script.type = "text/javascript";
//     document.head.appendChild(script);

//     script.onload = () => {
//       window.cloudinary.openUploadWidget(
//         {
//           cloudName: cloudinaryConfig.cloudName, // Using the imported cloudName
//           uploadPreset: cloudinaryConfig.uploadPreset, // Using the imported uploadPreset
//           sources: ["local", "url"], // Define where you want users to upload images from
//           showAdvancedOptions: true,
//           cropping: true,
//           multiple: false,
//         },
//         (error, result) => {
//           if (result && result.event === "success") {
//             // Handle the uploaded file URL or data here
//             onUploadSuccess(result.info.secure_url);
//           }
//         }
//       );
//     };

//     return () => {
//       document.head.removeChild(script);
//     };
//   }, []);

//   const openWidget = () => {
//     window.cloudinary.openUploadWidget(
//       {
//         cloudName: cloudinaryConfig.cloudName,
//         uploadPreset: cloudinaryConfig.uploadPreset,
//         sources: ["local", "url"],
//         showAdvancedOptions: true,
//         cropping: true,
//         multiple: false,
//       },
//       (error, result) => {
//         if (result && result.event === "success") {
//           onUploadSuccess(result.info.secure_url);
//         }
//       }
//     ).open();
//   };

//   return (
//     <div>
//       <button onClick={openWidget} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
//         Upload MRI Scan
//       </button>
//     </div>
//   );
// };

// export default CloudinaryUploadWidget;
import React, { useEffect } from "react";
import { cloudinaryConfig } from './cloudinaryConfig'; // Import your config

const CloudinaryUploadWidget = ({ onUploadSuccess }) => {
  useEffect(() => {
    // Make sure the script is loaded before initializing the widget
    const script = document.createElement("script");
    script.src = "https://widget.cloudinary.com/v2.0/global/all.js";
    script.type = "text/javascript";
    document.head.appendChild(script);

    script.onload = () => {
      // No need to open the widget automatically
    };

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const openWidget = () => {
    window.cloudinary.openUploadWidget(
      {
        cloudName: cloudinaryConfig.cloudName,
        uploadPreset: cloudinaryConfig.uploadPreset,
        sources: ["local", "url"],
        showAdvancedOptions: true,
        cropping: true,
        multiple: false,
      },
      (error, result) => {
        if (result && result.event === "success") {
          onUploadSuccess(result.info.secure_url);
        }
      }
    ).open();
  };

  return (
    <div>
      <button onClick={openWidget} className="bg-deepviolet text-white px-4 py-2 rounded-md hover:bg-ultraviolet">
        Upload MRI Scan
      </button>
    </div>
  );
};

export default CloudinaryUploadWidget;
