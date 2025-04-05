import { Modal, Image, Grid, Text, Badge, Button, Progress, Stack } from "@mantine/core";

interface TournamentModalProps {
    opened: boolean;
    onClose: () => void;
    tournament: {
        name: string;
        location: string;
        date: string;
        description: string;
        participants: number;
        maxParticipants: number;
        price: number;
        status: string;
        imgUrl: string;
    };
}

const banner = "/Students/tennisbanner2.png";

const TournamentModal = ({ opened, onClose, tournament }: TournamentModalProps) => {
    return (
        <Modal
            opened={opened}
            onClose={onClose}
            size="lg"
            title={<Text size="xl" fw={700}>🏆 {tournament.name}</Text>}
        >
            <Stack>
                {/* Tournament Image */}
                <div className="flex justify-center">
                    <Image
                        // src={tournament.imgUrl || banner}
                        src = {banner}
                        height={120}
                        width={200}
                        alt="Tournament banner"
                        className="rounded-lg"
                    />
                </div>

                {/* Tournament Badges */}
                <div className="flex flex-wrap gap-2 justify-center">
                    <Badge color={tournament.status === "open" ? "green" : "red"} size="lg">
                        {tournament.status.toUpperCase()}
                    </Badge>
                    <Badge color="blue" size="lg">📍 {tournament.location}</Badge>
                    <Badge color="violet" size="lg">📅 {new Date(tournament.date).toLocaleDateString()}</Badge>
                </div>

                {/* Description */}
                <Text ta="center" size="md">{tournament.description}</Text>

                {/* Registration Progress */}
                <div className="space-y-2 text-center">
                    <Text fw={600}>Registration Progress</Text>
                    <div className="relative">
                        <Progress
                            value={(tournament.participants / tournament.maxParticipants) * 100}
                            size="lg"
                            radius="xl"
                        />
                        <Text size="sm" className="absolute inset-0 flex justify-center items-center">
                            {`${tournament.participants}/${tournament.maxParticipants} participants`}
                        </Text>
                    </div>
                </div>

                {/* Entry Fee and Register Button */}
                <div className="flex justify-between items-center">
                    <Text size="lg" fw={700}>💰 Entry Fee: ${tournament.price}</Text>
                    <Button
                        size="lg"
                        color="blue"
                        disabled={tournament.status !== "open"}
                    >
                        Register Now
                    </Button>
                </div>
            </Stack>
        </Modal>
    );
};

export default TournamentModal;
