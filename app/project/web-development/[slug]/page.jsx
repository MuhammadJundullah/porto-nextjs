"use client";

import React from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchDataFromAPI } from "@/lib/actions";
import Loading from "@/app/_components/Loading";
import Image from "next/image";
import { FaArrowLeft } from "react-icons/fa6";

export default function Page({ params }) {
  const { slug } = React.use(params);

  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchDataFromAPI(slug);
      setData(result);
    };

    fetchData();
  }, [slug]);

  return (
    <div className="sm:mx-auto mx-5 max-w-6xl flex flex-col justify-center min-h-screen">
      {data ? (
        <div className="container sm:mx-auto py-8">
          <div className="flex justify-between items-center py-4">
            <Link
              href="/#projects"
              className="flex  dark:hover:text-white hover:text-black text-gray-400">
              <FaArrowLeft className="mt-1" />
              <span className="ml-2">Back to Projects</span>
            </Link>
          </div>
          {data.map((item) => (
            <div key={item.id} className="mb-8">
              <h2 className="sm:text-5xl text-3xl font-semibold my-4">
                {item.judul}
              </h2>
              <div className="my-10 flex justify-center items-center">
                <Image
                  src={`https://res.cloudinary.com/dislphwb0/image/upload/v1747003784/${item.photo}`}
                  alt={item.judul}
                  width={800}
                  height={600}
                  className="rounded-lg border-2 border-gray-300 shadow-lg"
                />
              </div>
              <div className="sm:flex flex-col sm:flex-row mt-4 sm:gap-5">
                <p
                  className="my-4"
                  dangerouslySetInnerHTML={{ __html: item.desc }}
                />
                <div className="w-full">
                  <p className="py-2">
                    <strong>Site:</strong>
                    <a
                      href={item.site}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline">
                      {" "}
                      {item.site}
                    </a>
                  </p>
                  <p className="py-2">
                    <strong>Technologies:</strong> {item.tech}
                  </p>
                  <p className="py-2">
                    <strong>GitHub URL:</strong>{" "}
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline">
                      Source Code
                    </a>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}
