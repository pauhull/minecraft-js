import IndexBuffer from "client/gl/IndexBuffer";
import VertexBuffer from "client/gl/VertexBuffer";

class Mesh {

    public readonly numIndices: number;
    private readonly vertexBuffer: VertexBuffer;
    private readonly indexBuffer: IndexBuffer;

    public constructor(vertices: number[], attributes: number[], indices: number[]) {
        this.numIndices = indices.length;
        this.vertexBuffer = new VertexBuffer(vertices, attributes);
        this.indexBuffer = new IndexBuffer(indices);
    }

    public render(): void {
        this.bind();
        GL.drawElements(GL.TRIANGLES, this.numIndices, GL.UNSIGNED_INT, 0);
    }

    public delete(): void {
        this.vertexBuffer.delete();
        this.indexBuffer.delete();
    }

    public bind(): void {
        this.vertexBuffer.bind();
        this.indexBuffer.bind();
    }

    public unbind(): void {
        this.vertexBuffer.unbind();
        this.indexBuffer.unbind();
    }
}

export default Mesh;