import axios from "axios";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
export const API_URL = "http://143.198.64.152:1777/api";
const API_BASE_URL = "http://143.198.64.152:1777/api"; // API ning manzili

const axiosInstance = axios;
axiosInstance.defaults.baseURL = API_BASE_URL;

axiosInstance.interceptors.request.use(
  async (config) => {
    if (!config.headers.Authorization) {
      const token = localStorage.getItem("accessToken");

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const API = {
  //POST REQUEST
  fileUpload: (payload) =>
    axiosInstance.post("/attachment/v1/upload-photo", payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
  postBlog: (payload) => axiosInstance.post("/blog/v1", payload),
  postCategoryData: (payload) => axiosInstance.post("/category/v1", payload),
  postUserData: (payload) => axiosInstance.post("/user/v1/register", payload),

  //GET REQUEST
  getUserData: (payload) =>
    axiosInstance.get("/user/v1?page=0&size=100&sortBy=id", payload),

  deleteProductData: (payload) =>
    axiosInstance.delete(`/product/v1/${payload}`),
};

// Register uchun POST so'rov yuborish uchun funktsiya
export const registerUser = async (userData, setCode) => {
  const response = await axios
    .post(`${API_BASE_URL}/auth/v1/register`, userData)
    .then((res) => {
      toast.success("Telefon raqamingizga tasdiqlash uchun sms yuborildi!");
      if (res.status === 200) {
        setCode(true);
      }
      localStorage.setItem("token", `${res?.data?.objectKoinot?.token}`);
    });
  return response.data;
};

export const editUserPost = async (userData) => {
  const response = await axios
    .post(`${API_BASE_URL}/auth/v1/editMe`, userData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
    .then((res) => {
      window.location.reload();
      localStorage.setItem("tokenReview", `${res?.data?.objectKoinot?.token}`);
      toast.success("Sizning profilingiz muvaffaqiyatli tahrirlandi!");
      // if (res.status === 200) {
      //   setOpen(true);
      // }
    });
  return response.data;
};

export const loginUser = async (userData, setCode, handleClose) => {
  const response = await axios
    .post(`${API_BASE_URL}/auth/v1/login`, userData)
    .then((res) => {
      toast.success("Siz muvaffaqiyatli login qildingiz!");
      <Navigate to="/profile" replace />;
      window.location.reload();
      handleClose();
      if (res.status === 200) {
        setCode(true);
      }
      localStorage.setItem(
        "accessToken",
        `${res?.data?.objectKoinot?.accessToken}`
      );
    });
  return response.data;
};

export const PhoneSmsCode = async (userData, handleClose) => {
  const response = await axios
    .post(`${API_BASE_URL}/auth/v1/verify`, userData)
    .then((res) => {
      toast.success("Tabriklaymiz siz ro'yhatdan o'tdingiz!");
      localStorage.setItem(
        "accessToken",
        `${res?.data?.objectKoinot?.accessToken}`
      );
      <Navigate to="/profile" replace />;
      window.location.reload();
      handleClose();
    })
    .catch((err) => console.log(err));
  return response.data;
};

export const createProduct = async (data) => {
  const response = await axios.post(`${API_BASE_URL}/product/v1/`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const getCategory = async () => {
  const response = await axios.get(`${API_BASE_URL}/category/v1`);
  return response.data;
};

export const uploadImage = async (image) => {
  const response = await axios
    .post(`${API_BASE_URL}/attachment/v1/upload-photo`, image, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      toast.success("Muvaffaqiyatli rasm yuklandi!");
    });
  return response.data;
};

export const getSetupData = async () => {
  const response = await axios.get(`${API_BASE_URL}/auth/v1/me`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
  return response.data;
};

export const fetchRegionData = async () => {
  const response = await axios.get(
    `${API_BASE_URL}/region/v1/all?page=0&size=100`
  );
  return response.data;
};

export const fetchDistrictData = async (code, setData) => {
  const response = await axios.get(
    `${API_BASE_URL}/district/v1/all?regionId=${code}`
  );
  return response.data;
};

export const getProductData = async () => {
  const response = await axios.get(
    `${API_BASE_URL}/product/v1?page=0&size=20`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }
  );
  return response.data;
};

export const getProfileProductData = async () => {
  const response = await axios.get(
    `${API_BASE_URL}/product/v1?my=true&page=0&size=20`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }
  );
  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await axios.delete(`${API_BASE_URL}/product/v1/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
  return response.data;
};

export const likeProductPost = async (id) => {
  const response = await axios
    .post(
      `${API_BASE_URL}/basket-favourite-product/v1/favourites-save-remove?productId=${id}&searchType=WEB`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    )
    .then((res) => {
      toast.success(
        "Mahsulot muvaffaqiyatli tanlanganlar ro'yhatiga qo'shildi!"
      );
    })
    .catch((err) => {
      console.log(err);
      toast.danger(
        "Bu mahsulotni siz tanlanganlar ro'yhatiga qo'sha olmaysiz!"
      );
    });
  return response.data;
};

export const getLikeProductData = async () => {
  const response = await axios.get(
    `${API_BASE_URL}/basket-favourite-product/v1/favourites?page=0&size=10`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }
  );
  return response.data;
};

export const getByIdProductData = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/product/v1/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
  return response.data;
};

export const getByIdCategoryData = async (id) => {
  const response = await axios.get(
    `${API_BASE_URL}/product/v1?category=${id}&page=0&size=100`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }
  );
  return response.data;
};

export const getBlogData = async () => {
  const response = await axios.get(`${API_BASE_URL}/blog/v1?page=0`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
  return response.data;
};

export const getByIdBlogData = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/blog/v1/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
  return response.data;
};

export const getByIdBlogContent = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/blog/v1/content/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
  return response.data;
};

export const getProductTrueData = async () => {
  const response = await axios.get(
    `${API_BASE_URL}/product/v1?page=0&size=24&top=true`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }
  );
  return response.data;
};

export const getProductNewsData = async () => {
  const response = await axios.get(
    `${API_BASE_URL}/product/v1?page=0&size=24&sortBy=createdAt&sortDirection=DESC&top=false`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }
  );
  return response.data;
};

export const getParamsProductData = async (code, search) => {
  const response = await axios.get(
    `${API_BASE_URL}/product/v1?page=0&region=${code}&search=${search}&size=24&sortBy=createdAt&sortDirection=DESC&top=false`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }
  );
  return response.data;
};

export const getProductParamsTrueData = async (code, search) => {
  const response = await axios.get(
    `${API_BASE_URL}/product/v1?page=0&region=${code}&search=${search}&size=24&top=true`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }
  );
  return response.data;
};

export const getProfileData = async () => {
  const response = await axios.get(`${API_BASE_URL}/auth/v1/me`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
  return response.data;
};

export const getFilterProductData = async (regionId, search, category) => {
  const response = await axios.get(
    `${API_BASE_URL}/product/v1?active=true&category=${category}&page=0&region=${regionId}&search=${search}&size=24&top=true`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }
  );
  return response.data;
};
