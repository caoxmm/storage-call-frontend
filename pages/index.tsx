import Head from "next/head";
import { useCallback, useState } from "react";
import { retrieve, store } from "../service/api";
export default function Home() {
  const [baseUrl, setBaseUrl] = useState("");
  const [querying, setQuerying] = useState(false);
  const [queryRes, setQueryRes] = useState("");
  const query = useCallback(() => {
    if (!baseUrl) {
      alert(`please input baseUrl!`);
      return;
    }
    setQuerying(true);
    setQueryRes("");
    retrieve(baseUrl)
      .then((res) => {
        setQueryRes(JSON.stringify(res.data, null, 2));
      })
      .finally(() => {
        setQuerying(false);
      });
  }, [baseUrl]);
  const [num, setNum] = useState("0");
  const [transing, setTransing] = useState(false);
  const [transRes, setTransRes] = useState("");
  const trans = useCallback(() => {
    if (!baseUrl) {
      alert(`please input baseUrl!`);
      return;
    }
    try {
      const realNum = parseInt(num);
      setTransing(true);
      setTransRes("");
      store(baseUrl, realNum)
        .then((res) => {
          setTransRes(JSON.stringify(res.data, null, 2));
        })
        .finally(() => {
          setTransing(false);
        });
    } catch (e) {
      alert(e);
    }
  }, [baseUrl, num]);
  return (
    <div className="container">
      <Head>
        <title>Storage Api Demo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Storage Api Demo
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              all the functions of Storage
            </p>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">apiUrl</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <input
                    type="text"
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    value={baseUrl}
                    onChange={(e) => setBaseUrl(e.target.value)}
                  />
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  retrieve()
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={query}
                    disabled={querying}
                  >
                    {querying ? "Querying..." : "Query"}
                  </button>

                  <div>{queryRes}</div>
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  store(uint256 num)
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <div className="shadow overflow-hidden sm:rounded-md">
                    <div className="px-4 py-5 bg-white sm:p-6">
                      <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="first-name"
                            className="block text-sm font-medium text-gray-700"
                          >
                            num
                          </label>
                          <input
                            type="text"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            value={num}
                            onChange={(e) => setNum(e.target.value)}
                          />
                        </div>
                        <div className="col-span-6 sm:col-span-3 flex items-end">
                          <button
                            type="submit"
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            onClick={trans}
                            disabled={transing}
                          >
                            {transing ? "transact..." : "transact"}
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="px-4 py-3 bg-gray-50 sm:px-6">
                      {transRes}
                    </div>
                  </div>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </main>
    </div>
  );
}
