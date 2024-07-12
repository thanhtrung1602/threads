import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchAll } from "~/API";
import { FetchPut } from "~/API/FetchPost";
import { setCloseEditProfile } from "~/Redux/actionSlice";
import { loginSuccess } from "~/Redux/authSlice";
import { IUser } from "~/types/user";
function EditProfile() {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const u = useSelector((state) => state?.auth.login.currentUser);
  const { data, refetch } = fetchAll(`/users/getMe/${id}`);
  const [image, setImage] = useState(null);
  const [imageUpdate, setImageUpdate] = useState("");
  const [idUser, setIdUser] = useState("");
  const [username, setUsername] = useState("");
  const [story, setStory] = useState("");
  const [link, setLink] = useState("");
  const { mutate: update } = FetchPut();
  const user: IUser = data?.detailUser;

  useEffect(() => {
    return () => {
      if (image) {
        if (image.preview) URL.revokeObjectURL(image.preview);
      }
    };
  }, [image]);

  const handleImage = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      file.preview = URL.createObjectURL(file);
      setImage(file);
    }
    e.target.value = null;
  };

  useEffect(() => {
    setIdUser(user?.idUser);
    setUsername(user?.username);
    setStory(user?.story);
    setLink(user?.link);
    setImageUpdate(user?.image);
  }, [user]);

  const handleUpdate = () => {
    const formData = new FormData();
    formData.append("idUser", idUser);
    formData.append("username", username);

    formData.append("image", image);

    formData.append("story", story);
    formData.append("link", link);
    update(
      { url: `/users/updateUser/${u?.idUser}`, data: formData },
      {
        onSuccess: (res) => {
          dispatch(loginSuccess(res));
          queryClient.invalidateQueries({
            queryKey: [`/users/getMe/`],
          });
          queryClient.invalidateQueries({
            queryKey: [`/posts/getAllPostUser/${id}`],
          });
          dispatch(setCloseEditProfile());
          navigate(`/${res?.idUser}`);
          toast.success("Cập nhật thành công");
        },
        onError: (error) => {
          console.log(error);
          toast.error("Cập nhật thất bại");
        },
      }
    );
  };

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <div className="bg-second-color text-[15px] text-[#f3f5f7] border border-b-outline pt-[24px] px-[24px] w-[520px] h-[400px] rounded-3xl">
      <div className="flex w-full gap-3 pb-4">
        <div className="flex flex-col border-b border-b-outline w-full">
          <p className="font-semibold">Tên</p>
          <input
            className="outline-none bg-second-color pb-3 w-full"
            type="text"
            value={idUser}
            onChange={(e) => setIdUser(e.target.value)}
            name="idUser"
            id="idUser"
          />
        </div>
        <div className="relative">
          {user?.image || image ? (
            <div className="h-[52px] w-[52px] bg-[#1e1e1e] rounded-full">
              <img
                className="h-[52px] w-[60px] object-cover bg-[#1e1e1e] rounded-full"
                src={image ? image.preview : imageUpdate}
                alt={username}
              />
            </div>
          ) : (
            <div className="h-[52px] w-[52px] bg-[#1e1e1e] rounded-full flex items-center justify-center">
              <ManageAccountsIcon />
            </div>
          )}
          <input
            className="absolute h-[40px] w-[40px] opacity-0 top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 "
            type="file"
            onChange={handleImage}
            name=""
            id=""
          />
        </div>
      </div>
      <div className="border-b border-b-outline w-full mb-4 w">
        <p className="font-semibold">Tên đầy đủ</p>
        <input
          className="outline-none bg-second-color pb-3 w-full"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          name=""
          id=""
        />
      </div>
      <div className="border-b border-b-outline w-full mb-4">
        <p className="font-semibold">Tiểu sử</p>
        <input
          className="outline-none bg-second-color pb-3 placeholder:text-[#777] w-full"
          type="text"
          value={story}
          onChange={(e) => setStory(e.target.value)}
          name=""
          id=""
          placeholder="+ Viết tiểu sử"
        />
      </div>
      <div className="border-b border-b-outline w-full mb-4">
        <p className="font-semibold">Liên kết</p>
        <input
          className="outline-none bg-second-color pb-3 placeholder:text-[#777] w-full"
          type="text"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          name=""
          id=""
          placeholder="+ Thêm liên kết"
        />
      </div>
      <div className="w-full">
        <button
          className="px-4 w-full h-[52px] bg-white text-black font-semibold rounded-[10px]"
          type="submit"
          onClick={handleUpdate}
        >
          Xong
        </button>
      </div>
    </div>
  );
}

export default EditProfile;
