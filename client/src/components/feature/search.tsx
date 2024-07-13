import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import SearchApi from "~/API/Search";
import { IUser } from "~/types/user";
import ResultSearch from "./ResultSearch";

function Search() {
  const [key, setKey] = useState("");
  const refSearch = useRef(null);
  useEffect(() => {
    if (refSearch.current) {
      refSearch.current.focus();
    }
  }, []);

  const { data: searchs } = SearchApi({ url: "/users/search/", key: key });
  const search: IUser[] = searchs?.search || [];
  return (
    <div className="">
      <div className="text-center h-[60px] z-50 flex items-center justify-center w-[650px] bg-bg-primary fixed ">
        <span className="text-center text-[#f3f5f7] font-semibold text-[15px]">
          Tìm kiếm
        </span>
      </div>
      <div className="w-[640px] min-h-[686px] mt-16 border border-b-outline rounded-t-3xl bg-second-color">
        <div className="pt-[18px] px-6 pb-2">
          <form>
            <div className="w-[590px] h-[44px] py-3 px-4 rounded-2xl bg-[#0a0a0a] flex items-center gap-2">
              <FontAwesomeIcon className="text-[#777]" icon={faSearch} />
              <input
                ref={refSearch}
                className="bg-[#0a0a0a] w-full placeholder:[text-[#777] outline-none text-[#f3f5f7]"
                type="text"
                value={key}
                onChange={(e) => setKey(e.target.value)}
                name=""
                id=""
                placeholder="Tìm kiếm"
              />
            </div>
          </form>
        </div>
        {search.map((user) => (
          <ResultSearch key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}

export default Search;
