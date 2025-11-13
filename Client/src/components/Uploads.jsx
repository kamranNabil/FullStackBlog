import { toast } from "react-toastify";
import { IKContext, IKUpload } from "imagekitio-react";
import { useRef } from "react";

const authenticator = async () => {
    try {
        const response = await fetch(
            `${import.meta.env.VITE_API_URL}/posts/upload-auth`
        );

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(
                `Request failed with status ${response.status}: ${errorText}`
            );
        }

        const data = await response.json();
        const { signature, token, expire } = data;
        return { signature, token, expire };
    } catch (error) {
        throw new Error(`Failed to fetch upload authentication: ${error.message}`);
    }
};

const Uploads = ({ children, type, setProgress, setData }) => {
    const ref = useRef(null);

    const onError = (error) => {
        console.log(error);
        toast.error("Error uploading cover image");
    };

    const onSuccess = (response) => {
        console.log(response);
        setData(response);
    };

    const onUploadProgress = (progress) => {
        console.log(progress);
        setProgress(Math.round((progress.loaded / progress.total) * 100));
    };

    return (
        <IKContext
            publicKey={import.meta.env.VITE_IK_PUBLIC_KEY}
            urlEndpoint={import.meta.env.VITE_IK_URL_ENDPOINT}
            authenticator={authenticator}
        >
            <IKUpload
                useUniqueFileName={true}
                folder="/public"
                onError={onError}
                onSuccess={onSuccess}
                onUploadProgress={onUploadProgress}
                className="hidden"
                ref={ref}
                accept={`${type}/*`}
            /> 
            <div className="cursor-pointer" onClick={() => ref.current.click()}>
                {children}
            </div>
        </IKContext>
    );
};

export default Uploads;