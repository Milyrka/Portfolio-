import Foundation
import AVFoundation

guard CommandLine.arguments.count == 3 else {
  fputs("usage: convert-video input.mov output.mp4\n", stderr)
  exit(2)
}

let source = URL(fileURLWithPath: CommandLine.arguments[1])
let output = URL(fileURLWithPath: CommandLine.arguments[2])
try? FileManager.default.removeItem(at: output)

let asset = AVURLAsset(url: source)
guard let exporter = AVAssetExportSession(asset: asset, presetName: AVAssetExportPreset1280x720) else {
  fputs("cannot create exporter\n", stderr)
  exit(3)
}

exporter.outputURL = output
exporter.outputFileType = .mp4
exporter.shouldOptimizeForNetworkUse = true

let semaphore = DispatchSemaphore(value: 0)
exporter.exportAsynchronously { semaphore.signal() }
semaphore.wait()

switch exporter.status {
case .completed:
  print(output.path)
default:
  fputs("export failed: \(exporter.error?.localizedDescription ?? "unknown")\n", stderr)
  exit(4)
}
