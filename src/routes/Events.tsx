import { Button } from "@nextui-org/button";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";

export default function Events() {
  function EventDetails() {
    return (
      <Card className="max-w-[400px]">
        <CardHeader className="flex gap-3">
          <div className="flex flex-col">
            <p className="text-2xl font-bold">EVENT NAME</p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <div className="flex items-center justify-center gap-8 p-8">
            <p>START DATE</p>
            <p>END DATE</p>
          </div>
        </CardBody>
        <Divider />
        <CardFooter>
          <Button>View Participants</Button>
        </CardFooter>
      </Card>
    );
  }

  const events = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

  return (
    <div className="flex flex-wrap justify-center gap-8 p-8">
      {events.map((index) => (
        <EventDetails key={index} />
      ))}
    </div>
  );
}
