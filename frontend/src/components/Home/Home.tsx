import React, { MouseEventHandler, useEffect, useState } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";

const Home = () => {
  const [form, setForm] = React.useState({
    description: "",
    title: "",
    isAdult: "false",
    file: new Blob(),
    fileName: "",
    fileType: "",
    mediaType: "",
  });

  const [posts, setPosts] = React.useState([]);

  useEffect(() => {
    axios({
      method: "GET",
      url: "https://localhost:4131/post/all-adult",
      responseType: "json",
    })
      .then((response: AxiosResponse) => {
        setPosts(response.data);
      })
      .catch(console.error);
  }, []);

  const [url, setUrl] = React.useState("");
  const [id, setId] = React.useState("");

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e && e.target.files![0]) {
      let file: File = e.target.files![0];
      const types: string[] = file.type.split("/");

      setForm((form) => ({
        ...form,
        fileName: file.name.split(".")[0].replaceAll(" ", ""),
        fileType: types[1],
        mediaType: types[0][0].toUpperCase() + types[0].substring(1),
        file: file,
      }));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((form: any) => ({
      ...form,
      [e.target.id]: e.target.value,
    }));
  };

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((form: any) => ({
      ...form,
      [e.target.id]: e.target.value === "off" ? "true" : "false",
    }));
  };

  React.useEffect(() => {
    console.log(form);
  }, [form]);

  const formToFormData = () => {
    const formData = new FormData();
    for (const [key, value] of Object.entries(form)) {
      formData.append(key, value);
    }
    return formData;
  };

  const handleClick = () => {
    const formData = formToFormData();
    axios({
      method: "POST",
      data: formData,
      responseType: "json",
      url: "https://localhost:4131/post/create",
    })
      .then((response: AxiosResponse) => {
        console.log(response);
      })
      .catch((error: AxiosError) => {
        console.error(error);
      });
  };

  const extract = () => {
    // TODO: Removed hardocded urls
    axios({
      method: "GET",
      responseType: "arraybuffer",
      url: "https://localhost:4131/media/" + id,
    })
      .then((response: AxiosResponse) => {
        setUrl("https://localhost:4131/media/" + id);
      })
      .catch((error: AxiosError) => {
        console.error(error);
      });
  };

  const handleId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };

  return (
    <>
      <div>
        <label>
          File:
          <input type="file" onChange={handleFile} style={{ marginLeft: 10 }} />
        </label>
      </div>
      <div>
        <label>
          Title:
          <input
            type="text"
            id="title"
            value={form!.title}
            onChange={handleChange}
            style={{ marginLeft: 10 }}
          />
        </label>
      </div>
      <div>
        <label>
          Description:
          <input
            type="text"
            id="description"
            onChange={handleChange}
            value={form!.description}
            style={{ marginLeft: 10 }}
          />
        </label>
      </div>
      <div>
        <label>
          Adult content:
          <input
            id="isAdult"
            type="checkbox"
            value={form!.isAdult === "true" ? "on" : "off"}
            onChange={handleCheckbox}
            style={{ marginLeft: 10 }}
          />
        </label>
      </div>
      <div>
        <button disabled={form.file.size <= 0} onClick={handleClick}>
          Submit
        </button>
      </div>
      <div style={{ marginTop: 10 }}>
        <label>
          Search that shit up:
          <input
            value={id}
            onChange={handleId}
            style={{ marginLeft: 20 }}
            type="text"
          ></input>
        </label>
      </div>
      <div>
        <button onClick={extract}>Go!</button>
      </div>
      {url !== "" && (
        <div>
          <img src={url} />
        </div>
      )}
      {posts.map((post: any) => {
        return (
          <>
            <h3 style={{ lineHeight: 0 }}>title: {post.title}</h3>
            <h4>description: {post.description}</h4>
            <img src={`https://localhost:4131/media/${post.mediaId}`} />
          </>
        );
      })}
    </>
  );
};

export default Home;
