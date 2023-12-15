import { Button } from "@nextui-org/button";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import {
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { useEffect, useState } from "react";

export default function Games() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [newGame, setNewGame] = useState({ title: "", description: "" });

  useEffect(() => {
    async function fetchGames() {
      const response = await fetch("http://localhost:5000/games");
      const data = await response.json();
      setGames(data);
    }

    fetchGames();
  }, [isOpen]); // Add isOpen to the dependency array

  const handleEdit = (game) => {
    setSelectedGame(game);
    onOpen();
  };

  const handleSaveEdit = async () => {
    const response = await fetch(`http://localhost:5000/games/${selectedGame.game_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(selectedGame),
    });

    if (response.ok) {
      onOpenChange();
    } else {
      console.error("Failed to save changes");
    }
  };

  const handleAddGame = async () => {
    if (!newGame.title.trim() || !newGame.description.trim()) {
      alert("Please fill in all fields");
      return;
    }

    const response = await fetch("http://localhost:5000/games/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newGame),
    });

    if (response.ok) {
      onOpenChange();
      // Reset the newGame state after successful addition
      setNewGame({ title: "", description: "" });
    } else {
      console.error("Failed to add a new game");
    }
  };

  const handleDelete = async (gameId) => {
    // Display a confirmation pop-up
    const shouldDelete = window.confirm("Are you sure you want to delete this game?");

    if (!shouldDelete) {
      return; // If the user cancels the delete action, do nothing
    }

    const response = await fetch(`http://localhost:5000/games/${gameId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setGames((prevGames) => prevGames.filter((game) => game.game_id !== gameId));
    } else {
      console.error("Failed to delete the game");
    }
  };


  return (
    <div className="flex flex-col items-center p-8">
      <Button onClick={() => onOpen()} className="mb-5" color="primary" size="lg">
        Add a Game
      </Button>

      <div className="grid grid-cols-3 gap-8">
        {games.map((game) => (
          <Card key={game.game_id} className="w-600 h-600">
            <CardHeader className="flex gap-3">
              <div className="flex flex-col">
                <p className="text-2xl font-bold">{game.title}</p>
              </div>
            </CardHeader>
            <Divider />
            <CardBody>
              <div className="flex items-center justify-center gap-8 p-8">
                <p>{game.description}</p>
              </div>
            </CardBody>
            <Divider />
            <CardFooter className="flex justify-between">
              <div>
                <Button onClick={() => handleEdit(game)}>Edit</Button>
              </div>
              <div>
                <Button onClick={() => handleDelete(game.game_id)} color="danger">
                  Delete
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Game Modal */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {selectedGame === null ? "Add " : "Edit "} Game
              </ModalHeader>
              <ModalBody>
                <div className="flex w-full flex-col gap-8">
                  <Input
                    autoFocus
                    label="Title"
                    placeholder="Enter game title"
                    variant="bordered"
                    labelPlacement="outside"
                    value={selectedGame ? selectedGame.title : newGame.title}
                    onValueChange={(value) => {
                      setSelectedGame((prev) => (prev ? { ...prev, title: value } : prev));
                      setNewGame((prev) => ({ ...prev, title: value }));
                    }}
                    size="lg"
                  />
                  <Input
                    label="Description"
                    placeholder="Enter game description"
                    variant="bordered"
                    labelPlacement="outside"
                    value={selectedGame ? selectedGame.description : newGame.description}
                    onValueChange={(value) => {
                      setSelectedGame((prev) => (prev ? { ...prev, description: value } : prev));
                      setNewGame((prev) => ({ ...prev, description: value }));
                    }}
                    size="lg"
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={selectedGame === null ? handleAddGame : handleSaveEdit}
                >
                  {selectedGame === null ? "Add" : "Save"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
