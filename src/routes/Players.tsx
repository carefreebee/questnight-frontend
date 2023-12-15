import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure,
  type Selection,
} from "@nextui-org/react";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

export default function Players() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [players, setPlayers] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null); // players array index if updating, null if creating

  // controlled inputs for modal form
  const [inputName, setInputName] = useState("");
  const [inputGender, setInputGender] = useState<Selection>(new Set()); // set/array, but should only be 1 item inside
  const [inputWins, setInputWins] = useState("0");

  async function fetchPlayers() {
    const response = await fetch("http://localhost:5000/players");
    const data = await response.json();
    setPlayers(data);
  }

  async function createPlayer() {
    if (!inputName || !inputGender || !Array.from(inputGender).length) {
      alert("Please fill in all fields");
      return;
    }
    onOpenChange(); // to close the modal

    const reqBody = {
      gender: Array.from(inputGender)[0],
      name: inputName,
    };
    console.log(reqBody);

    await fetch("http://localhost:5000/players/", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(reqBody),
    });
    fetchPlayers();

    setInputName("");
    setInputGender(new Set());
  }

  async function updatePlayer() {
    if (!inputName || !inputGender || !Array.from(inputGender).length || !inputWins) {
      alert("Please fill in all fields");
      return;
    }
    onOpenChange(); // to close the modal

    const id = players[selectedRow].player_id;
    const reqBody = {
      gender: Array.from(inputGender)[0],
      name: inputName,
      total_wins: parseInt(inputWins),
    };

    console.log(id);
    console.log(reqBody);

    await fetch(`http://localhost:5000/players/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify(reqBody),
    });
    fetchPlayers();

    setSelectedRow(null);
    setInputName("");
    setInputGender(new Set());
    setInputWins("0");
  }

  async function deletePlayer(id) {
    await fetch(`http://localhost:5000/players/${id}`, {
      method: "DELETE",
    });
    fetchPlayers();
  }

  useEffect(() => {
    fetchPlayers();
  }, []);

  useEffect(() => {
    if (selectedRow === null) return;
    // when editing, selectedRow is a number,
    // so update the modal inputs to the current values of that row
    setInputName(players[selectedRow].name);
    setInputGender(new Set([players[selectedRow].gender]));
    setInputWins(players[selectedRow].total_wins.toString());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRow]);

  const columns = [
    { key: "name", header: "Player Name" },
    { key: "total_wins", header: "Number of Wins" },
    { key: "gender", header: "Gender" },
    { key: "actions", header: "Actions" },
  ];
  const genders = [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
    { label: "Other", value: "Other" },
  ];

  return (
    <div className="flex items-center p-8">
      <Table
        topContent={
          <div className="flex justify-between px-2">
            <span className="text-xl font-bold">Players</span>
            <Button
              size="lg"
              color="primary"
              onPress={() => {
                setSelectedRow(null);
                onOpen();
              }}
            >
              Add
            </Button>
          </div>
        }
      >
        <TableHeader>
          {columns.map((column) => (
            <TableColumn key={column.key}>{column.header}</TableColumn>
          ))}
        </TableHeader>
        <TableBody emptyContent={"No rows to display."}>
          {players.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {columns.map((column) => (
                <TableCell key={column.key}>
                  {column.key === "actions" ? (
                    <Dropdown>
                      <DropdownTrigger>
                        <Button variant="bordered" endContent={<ChevronDown />}>
                          Actions
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu
                        aria-label="Dynamic Actions"
                        onAction={(key) => {
                          if (key === "edit") {
                            setSelectedRow(rowIndex);
                            onOpen();
                          } else if (key === "delete") {
                            deletePlayer(row.player_id);
                          }
                        }}
                      >
                        <DropdownItem key="edit">Edit</DropdownItem>
                        <DropdownItem key="delete" color="danger" className="text-danger">
                          Delete
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  ) : (
                    row[column.key]
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {selectedRow === null ? "Create " : "Edit "} Player
              </ModalHeader>
              <ModalBody>
                <div className="flex w-full flex-col gap-8">
                  <Input
                    autoFocus
                    label="Name"
                    placeholder="Enter player name"
                    variant="bordered"
                    labelPlacement="outside"
                    value={inputName}
                    onValueChange={setInputName}
                    size="lg"
                  />
                  <Select
                    items={genders}
                    label="Gender"
                    placeholder="Select a gender"
                    variant="bordered"
                    labelPlacement="outside"
                    selectedKeys={inputGender}
                    onSelectionChange={setInputGender}
                    size="lg"
                  >
                    {(g) => <SelectItem key={g.value}>{g.label}</SelectItem>}
                  </Select>
                  {selectedRow !== null && (
                    <Input
                      autoFocus
                      label="Total wins"
                      placeholder="Enter number of wins"
                      type="number"
                      pattern="[0-9]+"
                      variant="bordered"
                      labelPlacement="outside"
                      value={inputWins}
                      onValueChange={setInputWins}
                      size="lg"
                    />
                  )}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={selectedRow === null ? createPlayer : updatePlayer}
                >
                  {selectedRow === null ? "Create" : "Update"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
