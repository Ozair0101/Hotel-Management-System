import Dropdown from "@/Components/CustomeDropDown";

const CListDropDown = ({ id }) => {
    return (
        <Dropdown>
            <Dropdown.Trigger>
                <span className="inline-flex rounded-md">
                    <button
                        type="button"
                        className="inline-flex items-center rounded-md border border-transparent px-3 py-2 text-base font-medium leading-4 text-black transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none"
                    >
                        ...
                    </button>
                </span>
            </Dropdown.Trigger>
            <Dropdown.Content>
                <Dropdown.Link
                    className="text-black"
                    href={route("payment.create", id)}
                >
                    Pay
                </Dropdown.Link>
            </Dropdown.Content>
        </Dropdown>
    );
};

export default CListDropDown;
