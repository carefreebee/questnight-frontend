import {
  Button,
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
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function EventParticipants() {
  const { id } = useParams();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [event, setEvent] = useState(null);
  const [players, setPlayers] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [inputPlayer, setInputPlayer] = useState<Selection>(new Set());

  async function fetchEvent() {
    const response = await fetch(`http://localhost:5000/events/${id}`);
    const data = await response.json();
    setEvent(data);
  }
  async function fetchPlayers() {
    const response = await fetch("http://localhost:5000/players");
    const data = await response.json();
    setPlayers(data);
  }
  async function fetchParticipants() {
    const response = await fetch(`http://localhost:5000/events/${id}/participants`);
    const data = await response.json();
    setParticipants(data);
  }
  async function addParticipant() {
    if (!inputPlayer || !Array.from(inputPlayer).length) return;
    const playerId = Array.from(inputPlayer)[0];
    onOpenChange(); // close the modal
    await fetch(`http://localhost:5000/events/${id}/join`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ player_id: playerId }),
    });
    fetchParticipants();
    setInputPlayer(new Set());
  }
  async function removeParticipant(playerId) {
    console.log(playerId);
    await fetch(`http://localhost:5000/events/${id}/leave`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ player_id: playerId }),
    });
    fetchParticipants();
  }

  useEffect(() => {
    fetchEvent();
    fetchPlayers();
    fetchParticipants();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = [
    { key: "event_participant_id", header: "event_participant ID" },
    { key: "participant_name", header: "Player name" },
    { key: "participant_id", header: "Player ID" },
    { key: "actions", header: "Actions" },
  ];

  return (
    <div className="flex p-8">
      <Table
        topContent={
          <div className="flex justify-between px-2">
            <span className="text-xl font-bold">
              {event?.game_title} {event && new Date(event.start_date).toLocaleDateString()}{" "}
              Participants
            </span>
            <Button size="lg" color="primary" onPress={onOpen}>
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
          {participants.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {columns.map((column) => (
                <TableCell key={column.key}>
                  {column.key === "actions" ? (
                    <Button onPress={() => removeParticipant(row.participant_id)}>Leave</Button>
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
              <ModalHeader className="flex flex-col gap-1">Add Participant</ModalHeader>
              <ModalBody>
                <div className="flex w-full flex-col gap-8">
                  <Select
                    items={players}
                    label="Player"
                    placeholder="Select a player"
                    variant="bordered"
                    labelPlacement="outside"
                    selectedKeys={inputPlayer}
                    onSelectionChange={setInputPlayer}
                    size="lg"
                    isRequired
                  >
                    {(p) => <SelectItem key={p.player_id}>{p.name}</SelectItem>}
                  </Select>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={addParticipant}>
                  Join
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
