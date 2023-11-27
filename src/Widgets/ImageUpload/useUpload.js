import { useState, useRef, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { uploadData } from '../../slices/CustomSlices/actions/apiActions';

export default function useUpload(
  appModel,
  rowId = false,
  company_filter = false,
  onChange,
  name
) {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const progressInfosRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const id_token = useSelector((state) => state.user.id_token);

  const dispatch = useDispatch();

  const UploadService = {
    upload: (file, onUploadProgress) => {
      setLoading(true);
      let formData = new FormData();

      formData.append('mediaFile', file);
      appModel && formData.append('appModel', appModel);
      rowId && formData.append('rowId', JSON.stringify([rowId]));
      company_filter && formData.append('company_filter', company_filter);

      return dispatch(
        uploadData(
          formData,
          'mediafile/image/upload',
          onUploadProgress,
          id_token,
          false
        )
      ).then((res) => {
        setSelectedFiles([]);
        toast.success('Image Uploaded.');
        onChange({
          target: {
            name: name,
            value: res.data.mediaFile,
          },
        });
      });
    },
  };

  const selectFiles = (event) => {
    let images = [];

    for (let i = 0; i < event.target.files.length; i++) {
      images.push(URL.createObjectURL(event.target.files[i]));
    }

    setSelectedFiles(event.target.files);
  };

  useEffect(() => {
    if (selectFiles && selectFiles.length !== 0) {
      uploadImages();
    }
    // eslint-disable-next-line
  }, [selectedFiles]);

  const upload = (idx, file) => {
    let _progressInfos = [...progressInfosRef.current.val];
    return UploadService.upload(file, (event) => {
      _progressInfos[idx].percentage = Math.round(
        (100 * event.loaded) / event.total
      );
    })
      .then(() => {
        //
      })
      .catch(() => {
        _progressInfos[idx].percentage = 0;

        //
      });
  };

  const uploadImages = () => {
    const files = Array.from(selectedFiles);

    let _progressInfos = files.map((file) => ({
      percentage: 0,
      fileName: file.name,
    }));

    progressInfosRef.current = {
      val: _progressInfos,
    };

    const uploadPromises = files.map((file, i) => upload(i, file));

    Promise.all(uploadPromises).then(() => {
      setLoading(false);
    });
  };

  return {
    selectFiles,
    loading,
  };
}
