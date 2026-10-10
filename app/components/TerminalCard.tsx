
import "./TerminalCard.css";

export default function TerminalCard() {
  return (
    <div className="terminal-card">
      <div className="terminal-header">
        <div className="terminal-dots">
          <span className="dot red" />
          <span className="dot yellow" />
          <span className="dot green" />
        </div>
        <span className="terminal-title">
          surya@portfolio — zsh
        </span>
      </div>

      <div className="terminal-body">
        <p>
          <span className="terminal-prompt">$</span>{" "}
          <span className="terminal-command">whoami</span>
        </p>

        <p className="terminal-output">
          Suryodaya Singh
          <br />
          Full-Stack Developer
        </p>

        <p>
          <span className="terminal-prompt">$</span>{" "}
          <span className="terminal-command">
            cat developer.json
          </span>
        </p>

        <pre className="terminal-json">
          <span>{"{"}</span>{"\n"}
          {"  "}<span className="json-key">"stack"</span>: [
          <span className="json-string">
            "React", "Node.js", "Java"
          </span>
          ],{"\n"}
          {"  "}<span className="json-key">"database"</span>: [
          <span className="json-string">
            "MongoDB", "PostgreSQL"
          </span>
          ],{"\n"}
          {"  "}<span className="json-key">"status"</span>:{" "}
          <span className="json-string">
            "Open to opportunities"
          </span>{"\n"}
          <span>{"}"}</span>
        </pre>

        <p className="terminal-last-line">
          <span className="terminal-prompt">$</span>{" "}
          <span className="terminal-command">
            build_something_great
          </span>{" "}
          <span className="terminal-cursor">▋</span>
        </p>
      </div>
    </div>
  );
}
