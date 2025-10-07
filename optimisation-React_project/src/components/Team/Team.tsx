import React from "react";
import { ITeam } from "../../api.ts";
import "./styles.css";

interface ITeamData {
  team: ITeam[];
}

interface ITeamMemberProps {
  name: string;
  position: string;
  image: string;
}

const TeamMember = React.memo(({ name, position, image }: ITeamMemberProps) => {
  return (
    <div>
      <img src={image} width={300} height={300} alt={name} />
      <p>
        {name}: {position}
      </p>
    </div>
  );
});

export const Team = React.memo(({ team }: ITeamData) => {
  return (
    <>
      <h2>Our Team</h2>
      <div className="component">
        {team.map(({ name, position, image }) => (
          <TeamMember key={name} name={name} position={position} image={image} />
        ))}
      </div>
    </>
  );
});
